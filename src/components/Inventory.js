import Table from "./Table";
import Popup from "./Popup";
import {getInventario} from "../helpers/customers";
import {formatInventoryData, getDataKeys, getSpanishMonthName} from "../helpers/formatting";
import React from "react";
import {withCookies} from "react-cookie";
import ExpressPickupForm from "./ExpressPickupForm";
import PackageAuthForm from "./PackageAuthForm";
import CardList from "./CardList";
import NewTable from "./NewTable";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

class Inventory extends React.Component {
    constructor(props) {
        super(props);

        const { cookies } = this.props;
        this.packageAuthPopup = React.createRef();
        this.packageExpressPickupPopup = React.createRef();
        this.filterDates = [];

        this.state = {
            pmb: cookies.get('user') ? cookies.get('user').pmb : null,
            selectedPackages: [],
            inventory: [],
            inventoryStatus: 'en_bodega',
            timeframe: 'annual',
            headers: [],
            isDesktop: false,
            isLoading: true
        }

        this.getDatesForFilter();
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    getDatesForFilter() {
        const today = moment(new Date());
        let currentDate = today;

        this.filterDates.push(today.format('MM/YYYY'));

        for(let i = 0; i <= 12; i++) {
            const nextDate = currentDate.subtract(1, 'M');
            currentDate = nextDate;
            this.filterDates.push(nextDate.format('MM/YYYY'));
        }
    }

    renderDatesForFilter() {
        const optionItem = (value, index) => {
            const dateToArray = value.split('/');
            const month = dateToArray[0];
            const year = dateToArray[1];
            const label = `${getSpanishMonthName(month)} ${year}`;

            return <MenuItem key={`option${index}`} value={value}>{label}</MenuItem>;
        };

        return this.filterDates.map((x, y) => optionItem(x, y));
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.inventoryStatus !== this.state.inventoryStatus ||
            prevState.timeframe !== this.state.timeframe) {
            this.getData();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    getData() {
        getInventario(this.state.pmb, this.state.inventoryStatus, this.state.timeframe).then((res) => {
            if (res.status === 200) {
                const data = this.props.formatData ? this.props.formatData(res.data) : res.data;
                this.setState({
                    headers: getDataKeys(data[0]),
                    inventory: data
                });
            }
        });
    }

    addPackage(item) {
        const isSameId = (updatedPackage) => item.id === updatedPackage.id;
        const isAlreadyAdded = this.state.selectedPackages.findIndex(isSameId) > -1;
        const updatedPackages = isAlreadyAdded ? this.state.selectedPackages.filter(isSameId) : [...this.state.selectedPackages, item];
        this.setState({selectedPackages: updatedPackages});
    }

    submitted(popup) {
        popup.close();
    }

    setInventoryStatus(event) {
        this.setState({
            inventoryStatus: event.target.value
        })
    }

    filterByDate(event) {
        this.setState({
            timeframe: event.target.value
        })
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 800 });
    }

    render() {
        const isDesktop = this.state.isDesktop;

        return (
            <div className="content-container content-container-with-padding" style={{backgroundColor: '#f6f6f6'}}>
                <div className="button-group button-group-right">
                    <Popup title="Programa tu entrega:" buttonLabel="Entrega Express" ref={(popup) => { this.packageExpressPickupPopup = popup}}>
                        <ExpressPickupForm hasSubmitted={() => this.submitted(this.packageExpressPickupPopup)} pmb={this.state.pmb} packages={this.state.selectedPackages}/>
                    </Popup>
                    <Popup title="Autorización:" buttonLabel="Autorización" ref={(popup) => { this.packageAuthPopup = popup}}>
                        <PackageAuthForm pmb={this.state.pmb} packages={this.state.selectedPackages}/>
                    </Popup>
                </div>
                <div className="panel panel-home panel-default">
                    <div className="panel-heading">
                        <h2>Inventario</h2>
                    </div>
                    <div className="panel-body">
                        <div className="table-filters">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.inventoryStatus}
                                onChange={(e) => this.setInventoryStatus(e)}

                            >
                                <MenuItem value='en_bodega'>En Bodega</MenuItem>
                                <MenuItem value='entregado'>Entregado</MenuItem>
                            </Select>
                            {
                               this.state.inventoryStatus !== 'en_bodega' &&

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.timeframe}
                                    onChange={(e) => this.filterByDate(e)}
                                >
                                    <MenuItem value='annual'>Todo el año</MenuItem>
                                    {this.renderDatesForFilter()}
                                </Select>
                            }
                        </div>
                        {
                            isDesktop ?
                                <Table getData={() => getInventario(this.state.pmb)} formatData={(data) => formatInventoryData(data, [])} hasCheckbox={true} onCheck={(row) => this.addPackage(row)}/>                            :
                                <CardList cards={this.state.inventory} onCheck={(row) => this.addPackage(row)}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(Inventory);
