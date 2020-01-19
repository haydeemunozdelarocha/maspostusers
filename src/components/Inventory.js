import Table from "./Table";
import Popup from "./Popup";
import {getInventario} from "../helpers/customers";
import {getUserCookie} from "../helpers/authentification";
import {formatInventoryData, getDataKeys, getSpanishMonthName} from "../helpers/formatting";
import React from "react";
import {withCookies} from "react-cookie";
import ExpressPickupForm from "./ExpressPickupForm";
import PackageAuthForm from "./PackageAuthForm";
import CardList from "./CardList";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

class Inventory extends React.Component {
    constructor(props) {
        super(props);

        const { cookies } = this.props;
        this.packageAuthPopup = React.createRef();
        this.packageExpressPickupPopup = React.createRef();
        this.filterDates = [];

        this.state = {
            pmb: getUserCookie(cookies) ? getUserCookie(cookies).pmb : null,
            selectedPackages: [],
            inventory: [],
            inventoryStatus: 'en_bodega',
            timeframe: 'annual',
            headers: [],
            isDesktop: false,
            isLoading: true,
            allSelected: false
        };

        this.getDatesForFilter();
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    getDatesForFilter() {
        const today = moment(new Date());
        let currentDate = today;

        this.filterDates.push(today.format(dateFormat));

        for(let i = 0; i <= 12; i++) {
            const nextDate = currentDate.subtract(1, 'M');
            currentDate = nextDate;
            this.filterDates.push(nextDate.format(dateFormat));
        }
    }

    renderDatesForFilter() {
        const optionItem = (value, index) => {
            const dateToArray = value.split('/');
            const month = dateToArray[1];
            const year = dateToArray[2];
            const label = `${getSpanishMonthName(month)} ${year}`;

            return <MenuItem key={`option${index}`} value={value}>{label}</MenuItem>;
        };

        return this.filterDates.map((x, y) => optionItem(x, y));
    }

    componentDidMount() {
        this.updateWindowSize();
        window.addEventListener("resize", this.updateWindowSize);
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
        window.removeEventListener("resize", this.updateWindowSize);
    }

    getData() {
        getInventario(this.state.pmb, this.state.inventoryStatus, this.state.timeframe).then((res) => {
            const updatedState = {};
            if (res.status === 200) {
                const data = formatInventoryData(res.data, [], {addSelect: true});
                updatedState.headers = getDataKeys(data[0]);
                updatedState.inventory = data;
                updatedState.allSelected = false;
            }

            updatedState.isLoading = false;
            this.setState(updatedState);
        });
    }

    addPackage(item) {
        const isSameId = (updatedPackage) => item.id === updatedPackage.id;
        const isAlreadyAdded = this.state.selectedPackages.findIndex(isSameId) > -1;
        item.isSelected = !isAlreadyAdded;
        const updatedPackages = isAlreadyAdded ?
            this.state.selectedPackages.filter(isSameId) :
            [...this.state.selectedPackages, item];
        this.setState({
            selectedPackages: updatedPackages,
        });
    }

    selectAll() {
        const {inventory, allSelected} = this.state;

        const updatedPackages = inventory.map((item) => {
            item.isSelected = !allSelected;
            return item;
        });

        this.setState({
            inventory: updatedPackages,
            selectedPackages: !allSelected ? updatedPackages : [],
            allSelected: !allSelected
        })
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

    updateWindowSize() {
        this.setState({ isDesktop: window.innerWidth > 800 });
    }

    render() {
        const {isDesktop, allSelected, selectedPackages, pmb, inventoryStatus, timeframe, inventory, isLoading, headers } = this.state;
        console.log('RENDERING AGAIN', this.state);
        return (
            <div className="content-container content-container-with-padding" style={{backgroundColor: '#f6f6f6'}}>
                <div className="button-group button-group-right">
                    <Popup title="Programa tu entrega:" buttonLabel="Entrega Express" ref={(popup) => { this.packageExpressPickupPopup = popup}}>
                        <ExpressPickupForm hasSubmitted={() => this.submitted(this.packageExpressPickupPopup)} pmb={pmb} packages={selectedPackages}/>
                    </Popup>
                    <Popup title="Autorización:" buttonLabel="Autorización" ref={(popup) => { this.packageAuthPopup = popup}}>
                        <PackageAuthForm pmb={pmb} packages={selectedPackages}/>
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
                                value={inventoryStatus}
                                onChange={(e) => this.setInventoryStatus(e)}

                            >
                                <MenuItem value='en_bodega'>En Bodega</MenuItem>
                                <MenuItem value='entregado'>Entregado</MenuItem>
                            </Select>
                            {
                               inventoryStatus !== 'en_bodega' &&

                                <Select
                                    id="demo-simple-select"
                                    value={timeframe}
                                    onChange={(e) => this.filterByDate(e)}
                                >
                                    <MenuItem value='annual'>Todo el año</MenuItem>
                                    {this.renderDatesForFilter()}
                                </Select>
                            }
                        </div>
                        {
                            isDesktop ?
                                <Table allSelected={allSelected} selectAll={() => this.selectAll()} isLoading={isLoading} data={inventory} headers={headers} hasCheckbox={inventoryStatus !== 'entregado'} onCheck={(row) => this.addPackage(row)}/>                            :
                                <CardList allSelected={allSelected} cards={inventory} selectAll={() => this.selectAll()} onCheck={(row) => this.addPackage(row)} hasCheckbox={inventoryStatus !== 'entregado'}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(Inventory);
