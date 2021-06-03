import React from 'react';
import 'styles/index.scss';
import 'font-awesome/css/font-awesome.min.css';
import {Redirect} from "react-router-dom";
import {getAccessToken, getIdToken, isUserInGroups} from "../../utils/AuthService";
import {AppConfig} from "../../config";

import ApiInstruction from "../ApiInstruction/ApiInstruction";


export default class App extends React.Component {
	handleAKMAPIClick = () => {
		window.open(ApiInstruction, '_blank');
	};

	constructor(props) {
		super(props);

		this.state = {
			navigate: false
		};
		App.ssoToApp = this.ssoToApp.bind(this);
		this.checkPermission = this.checkPermission.bind(this);
		this.openTableau = this.openTableau.bind(this);
		this.openEmbeddedDashboard = this.openEmbeddedDashboard.bind(this);
	}

	checkPermission(appName) {
		if (!getAccessToken()) {
			this.setState({navigate: '/signin'});
			return false;
		}
		if (isUserInGroups(AppConfig.permissionGroups[appName]) === false) {
			this.setState({navigate: '/no-access/' + appName});
			return false;
		}
		return true;
	}

	ssoToApp(appName) {
		if (this.checkPermission(appName)) {
			this.openInNewTab(AppConfig.appUrl + "#/sso/" + appName);
		}
	}

	openInNewTab = (url) => {
		const win = window.open(url, '_blank');
		win.focus();
	};

	openTableau(appName, url) {
		if (this.checkPermission(appName)) {
			this.openInNewTab(url);
		}
	}

	openEmbeddedDashboard(appName, path) {
		if (this.checkPermission(appName)) {
			const url = `${AppConfig.embeddedDashboardUrl}/${path}?id_token=${getIdToken()}`;
			this.openInNewTab(url);
		}
	}

	openAKMKey(url) {
		if (this.checkPermission('avenueapi')) {
			this.openInNewTab(url);

		}
	}

	openAccountMgnt(url) {
		if (this.checkPermission('accountmanagement')) {
			this.openInNewTab(url);
		}
	}

	render() {
		if (this.state.navigate !== false) {
			return (<Redirect to={this.state.navigate} push={true}/>);
		}

		return (
			<div>
				<div className="text-center container-frame">

					<div className="row">
						<h1 className="title-header">7Park Data's Avenue Suite</h1>
					</div>

					<div className="row">
						<br/><br/>
						<p>Select the Dashboard you want to access below</p>
					</div>

					<div className="row">
						<p>Email <a href="mailto:support@7parkdata.com">support@7parkdata.com</a> with any questions</p>
						<br/><br/>

					</div>


					{isUserInGroups(AppConfig.permissionGroups['directory']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={dataDiscoverImg} onClick={() => App.ssoToApp('directory')}/>
									<div className="tiles-comments-hover">Product Details, Documents and Sample
										Data
									</div>
								</div>
								<div className="col-md-12 tiles-comments"> DATASET DISCOVER</div>
							</div>
						</div>
						: null}


					<div className=" col-centered">
						<div className="row hover-container">
							<div className="col-md-12 items-container">
								<img className={"img-icon"} src={reportCatalog} onClick={() => App.ssoToApp('catalog')}/>
								<div className="tiles-comments-hover">Online Report Library</div>
							</div>
							<div className="col-md-12 tiles-comments">REPORT CATALOG</div>
						</div>
					</div>


					{isUserInGroups(AppConfig.permissionGroups['avenueapi']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={keyMetrics} onClick={() => {
										this.openAKMKey('/#/akm_key/')
									}}/>
									<div className="tiles-comments-hover">LPIs, Forecasts and Backtests</div>
								</div>
								<div className="col-md-12 tiles-comments">KEY METRICS API</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['accountmanagement']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container"
								>
									<img className={"img-icon"} src={accountManagment}
											 onClick={() => this.openAccountMgnt(AppConfig.accountmanagementUrl)}/>
									<div className="tiles-comments-hover">Account Management UI & User Profile</div>
								</div>
								<div className="col-md-12 tiles-comments">ACCOUNT MANAGEMENT</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['reported']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={reportedData} onClick={() => App.ssoToApp('reported')}/>
									<div className="tiles-comments-hover">Inspected reported metrics for companies</div>
								</div>
								<div className="col-md-12 tiles-comments">REPORTED DATA</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['realproperties']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={realProperties} onClick={() => App.ssoToApp('realproperties')}/>
									<div className="tiles-comments-hover">CRE Property Fundamentals</div>
								</div>
								<div className="col-md-12 tiles-comments">REAL PROPERTIES</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['realmarkets']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={cre_dashboard}
											 onClick={() => this.openTableau('realmarkets', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Micro-market trends and rankings</div>
								</div>
								<div className="col-md-12 tiles-comments">REAL MARKETS</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['MECorporateTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={me_dashboard}
											 onClick={() => this.openTableau('MECorporateTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">SVOD Measurement</div>
								</div>
								<div className="col-md-12 tiles-comments">MEDIA & ENTERTAINMENT</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['MEFSTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={me_finance}
											 onClick={() => this.openTableau('MEFSTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">SVOD Measurement for Financial Services</div>
								</div>
								<div className="col-md-12 tiles-comments">STREAMING</div>
							</div>
						</div>
						: null}


					{isUserInGroups(AppConfig.permissionGroups['cloudyFSTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={it_finance}
											 onClick={() => this.openTableau('cloudyFSTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Cloud Infrastructure Dashboard - Financial Services</div>
								</div>
								<div className="col-md-12 tiles-comments">Cloud Dashboard FS</div>
							</div>
						</div>
						: null}


					{isUserInGroups(AppConfig.permissionGroups['cloudyCorporateTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={it_corp}
											 onClick={() => this.openTableau('cloudyCorporateTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Cloud Infrastructure Dashboard - Corporate</div>
								</div>
								<div className="col-md-12 tiles-comments">Cloud Dashboard CORP</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['appIntelFSTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={appIntel_finance}
											 onClick={() => this.openTableau('appIntelFSTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">App Intel Dashboard - Financial Services</div>
								</div>
								<div className="col-md-12 tiles-comments">App Intel FS</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['emailReceiptTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={email_receipt}
											 onClick={() => this.openTableau('emailReceiptTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Sales & Transaction Volume by Company and Sector</div>
								</div>
								<div className="col-md-12 tiles-comments">Email Receipt Dashboard</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['dataQualityTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={data_quality}
											 onClick={() => this.openTableau('dataQualityTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Data Quality Monitoring by Dataset</div>
								</div>
								<div className="col-md-12 tiles-comments">Data Quality DASHBOARD</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['ridesharingFSTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={ridesharing_fs_icon}
											 onClick={() => this.openTableau('ridesharingFSTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Ridesharing Dashboard - Uber & Lyft</div>
								</div>
								<div className="col-md-12 tiles-comments">RIDESHARING DASHBOARD FS</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['restrictedStockTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={stock_restriction}
											 onClick={() => this.openEmbeddedDashboard('restrictedStockTableauDashboard', 'restricted-stock-list')}/>
									<div className="tiles-comments-hover">Restricted Stock List</div>
								</div>
								<div className="col-md-12 tiles-comments">Restricted Stock List</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['luluTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={lulu_icon}
											 onClick={() => this.openTableau('luluTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Email Receipt Deep Dive Dashboard: LULU</div>
								</div>
								<div className="col-md-12 tiles-comments">Email Receipt Dashboard: LULU</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['foodDeliveryTableauDashboard']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={food_delivery}
											 onClick={() => this.openTableau('foodDeliveryTableauDashboard', AppConfig.tableauSSOUrl)}/>
									<div className="tiles-comments-hover">Food Delivery Dashboard - DASH, GRUB, & UBER</div>
								</div>
								<div className="col-md-12 tiles-comments">Food Delivery Dashboard</div>
							</div>
						</div>
						: null}
					
					{isUserInGroups(AppConfig.permissionGroups['lastmile']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={last_mile}
											 onClick={() => this.openEmbeddedDashboard('lastmile', 'last-mile')}/>
									<div className="tiles-comments-hover">Last Mile Dashboard</div>
								</div>
								<div className="col-md-12 tiles-comments">Last Mile Dashboard</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['residental']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={residental}
											 onClick={() => this.openEmbeddedDashboard('residental', 'residental')}/>
									<div className="tiles-comments-hover">Market Exploration Dashboard</div>
								</div>
								<div className="col-md-12 tiles-comments">Market Exploration Dashboard</div>
							</div>
						</div>
						: null}

					{isUserInGroups(AppConfig.permissionGroups['residentaldynamicindex']) ?
						<div className=" col-centered">
							<div className="row hover-container">
								<div className="col-md-12 items-container">
									<img className={"img-icon"} src={residental_dynamic_index}
											 onClick={() => this.openEmbeddedDashboard('residentaldynamicindex', 'residental-dynamic-index')}/>
									<div className="tiles-comments-hover">Residental Dynamic Index Dashboard</div>
								</div>
								<div className="col-md-12 tiles-comments">Residental Dynamic Index Dashboard</div>
							</div>
						</div>
						: null}

				</div>
			</div>

		)
	}
};
