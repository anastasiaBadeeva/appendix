//TODO: refactor/reformat the code to make it cleaner. Need to change the css class name as well to
//      avoid redundancy

import React, {Component} from 'react';
import {Collapse, Glyphicon} from 'react-bootstrap';

import {getUserEmail, isUserInGroups} from "../../utils/AuthService";
import AppList from '../AppList/AppList';
import {AppConfig} from "../../config";

class ApiInstruction extends Component {
    state = {
        apps: [],
        client_id: null,
        client_secret: null,
        des_get_started: true,
        des_auth: true,
        des_token: false,
        des_auth_example: false,
        des_ts: false,
        des_forecast: false,
        des_forecast_history: false,
        des_forecast_ts: false,
        des_other: false,
    };

    componentDidMount() {
        fetch(`${AppConfig.avenueUrl}/v4/get_apps`, {
            method: 'post',
            body: JSON.stringify({"useremail": getUserEmail()}),
            headers: {'Content-Type': 'application/json',
                      'authorization': 'Bearer ' + this.getToken()}
        })
        .then(res => res.json())
        .then(
            (result) => {
                let temp_app = JSON.parse(result);
                this.setState({apps: temp_app});
            },
            (error) => {
                console.log("error", error);
            }
        );
    }

    getToken = (props) => {
        let token = localStorage.getItem("access_token");
        return token;
    }

    handleClick = (event) => {
        fetch(`${AppConfig.avenueUrl}/v4/create_app`, {
            method: 'post',
            body: JSON.stringify({"useremail": getUserEmail()}),
            headers: {'Content-Type': ' application/json',
                      'authorization': 'Bearer ' + this.getToken()}
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.status);
                } else {
                    return res.json();
                }
                })
            .then(
                (result)=> {
                    let result_json = JSON.parse(result);
                    this.setState({
                        client_id: result_json.client_id,
                        client_secret: result_json.client_secret
                    });
                },
                (error) => {
                    console.log("error", error);
                }
            );
    }

    render () {
        const companiesExample = {
          "count": 1,
          "next": null,
          "previous": null,
          "results": [
            {
              "company_id": 4354,
              "company_name": "Netflix, Inc.",
              "ticker": "NFLX"
            }
          ]
        }

        const metricsExample = {
          "count": 14,
          "next": null,
          "previous": null,
          "results": [
            {
              "metric_id": 67,
              "metric_name": "App DAU Pcnt Panel",
              "metric_description": "Percent of app panel who are unique daily active users"
            },
            {
              "metric_id": 172,
              "metric_name": "Subscription Index",
              "metric_description": "Indexed traffic to the site sign-up confirmation URL"
            },
            "...",
          ]
        }

        const entitiesExample = {
          "count": 1,
          "next": null,
          "previous": null,
          "results": [
            {
              "entity_id": 46399,
              "entity_name": "Netflix"
            }
          ]
        }

        const queriesExample = {
            "queries": [
                {
                  "key_1": "val_1",
                  "key_2": "val_2",
                  "key_3": "val_3",
                  "key_4": "val_4",
                  "key_N": "val_N",
                },
                {
                  "entity_id": 46399,
                  "metric_id": 172,
                  "metric_periodicity": "Daily",
                  "discovery_name": "Netflix",
                  "company_name": "Netflix, Inc.",
                  "country_name": "United States of America"
                },
                {
                  "entity_id": 46399,
                  "metric_id": 172,
                  "metric_periodicity": "Daily",
                  "discovery_name": "Netflix",
                  "company_name": "Netflix, Inc.",
                  "world_region_name": "North America"
                },
                {
                  "entity_id": 46399,
                  "metric_id": 172,
                  "metric_periodicity": "Daily",
                  "discovery_name": "Netflix",
                  "company_name": "Netflix, Inc.",
                  "us_region_name": "North Eastern United States"
                },
                "..."
            ]
        }

        const queriesExample2 = {
            "queries": [
                {
                  "entity_id": 1928290,
                  "metric_id": 740,
                  "metric_periodicity": "Daily",
                  "discovery_name": "Netflix",
                  "company_name": "Netflix, Inc.",
                  "country_name": "Canada",
                  "metric_name": "DownloadsAndroidiOS"
                },
                {
                  "entity_id": 1928290,
                  "metric_id": 740,
                  "metric_periodicity": "Daily",
                  "discovery_name": "Netflix",
                  "company_name": "Netflix, Inc.",
                  "country_name": "United States of America",
                  "metric_name": "DownloadsAndroidiOS"
                },
                {
                  "entity_id": 1928290,
                  "metric_id": 740,
                  "metric_periodicity": "Daily",
                  "discovery_name": "Netflix",
                  "company_name": "Netflix, Inc.",
                  "country_name": "Brazil",
                  "metric_name": "DownloadsAndroidiOS"
                },
                "..."
            ]
        }

        const dataExample = {
          "status": "ok",
          "query": {
            "entity_id": 46399,
            "metric_id": 172,
            "metric_periodicity": "Daily",
            "world_region_name": "N/A",
            "us_region_name": "N/A",
            "country_name": "United States of America"
          },
          "errors": [],
          "data": [{
        "world_region_name": "N/A",
        "metric_id": 172,
        "entity_name": "Netflix",
        "entity_type": "subscriptions",
        "company": "Netflix, Inc.",
        "us_region_name": "N/A",
        "value": 2.4959247,
        "country_name": "United States of America",
        "date": "2014-01-02",
        "metric_name": "Subscription Index"},
        {
        "world_region_name": "N/A",
        "metric_id": 172,
        "entity_name": "Netflix",
        "entity_type": "subscriptions",
        "company": "Netflix, Inc.",
        "us_region_name": "N/A",
        "value": 2.3932033,
        "country_name": "United States of America",
        "date": "2014-01-03",
        "metric_name": "Subscription Index"},
        {
        "world_region_name": "N/A",
        "metric_id": 172,
        "entity_name": "Netflix",
        "entity_type": "subscriptions",
        "company": "Netflix, Inc.",
        "us_region_name": "N/A",
        "value": 2.3834053,
        "country_name": "United States of America",
        "date": "2014-01-04",
        "metric_name": "Subscription Index"},
        "..."
                ]
            }

				const dataExample2 = {
    "status": "ok",
    "query": {
        "entity_id": 1916255,
        "metric_id": 768,
        "metric_periodicity": "Quarter_Over_Quarter",
        "world_region_name": "N/A",
        "us_region_name": "N/A",
        "country_name": "N/A"
    },
    "errors": [],
    "data": [{
        "world_region_name": "N/A",
        "date": "2016-01-01",
        "metric_id": 768,
        "company": "Netflix, Inc.",
        "us_region_name": "N/A",
        "value": 0.0290798535735994,
        "country_name": "N/A"
    }, {
        "world_region_name": "N/A",
        "date": "2016-04-01",
        "metric_id": 768,
        "company": "Netflix, Inc.",
        "us_region_name": "N/A",
        "value": -0.0673741723420408,
        "country_name": "N/A"
    }, {
        "world_region_name": "N/A",
        "date": "2016-07-01",
        "metric_id": 768,
        "company": "Netflix, Inc.",
        "us_region_name": "N/A",
        "value": -0.0260086664603224,
        "country_name": "N/A"
     }, "..."]}


        const forecastsExample = {
          "count": 2,
          "next": null,
          "previous": null,
          "results": [
            {
              "company_id": 4354,
              "company_name": "Netflix, Inc.",
              "entity_id": 1928290,
              "entity_name": "Netflix",
              "metric_id": 740,
              "metric_name": "App Downloads",
              "forecast_metric_name": "U.S. Subscribers"
            },
            {
              "company_id": 4354,
              "company_name": "Netflix, Inc.",
              "entity_id": 46399,
              "entity_name": "Netflix",
              "metric_id": 172,
              "metric_name": "Subscription Index",
              "forecast_metric_name": "U.S. Subscribers"
            }
          ]
        }

        const forecastExample = {
          "forecast_metric_name": "U.S. Subscribers",
          "forecast": "xxxxx.xxxx",
          "forecast_unit": "",
          "period_effective_start_date": "2018-07-01",
          "period_effective_end_date": "2018-09-30",
          "entity_name": "Netflix",
				  "permission": true,
				  "data": [{
											"forecast": "xxxxx.xxxx",
											"r_squared": 0.9534533,
											"correlation": 0.984342,
											"description": "Based on quarter over quarter quarterly growth rates.",
											"queries": [{
																			"entity_id": 1916255,
																			"metric_id": 768,
																			"metric_periodicity": "Quarter_Over_Quarter",
																			"metric_type": "7Park Data"
																	},
																	{
																			"entity_id": 1916255,
																			"metric_id": 704,
																			"metric_periodicity": "Quarter_Over_Quarter",
																			"metric_type": "reported"
																	}]
										},
										{
											"forecast": "xxxxx.xxxx",
											"r_squared": 0.9704035,
											"correlation": 0.9232300,
											"description": "Based on year over year quarterly growth rates.",
											"queries": [{
																		"entity_id": 1916255,
																		"metric_id": 768,
																		"metric_periodicity": "Year_Over_Year",
																		"metric_type": "7Park Data"
																	},
																	{
																		"entity_id": 1916255,
																		"metric_id": 704,
																		"metric_periodicity": "Year_Over_Year",
																		"metric_type": "reported"
																	}]
										}]
				}

				const forecastHistoryExample = {"data":
					[
							{	"company": "Netflix, Inc.",
								"metric_name_reported": "U.S. Subscribers",
								"period_effective_start_date": "2018-04-01",
								"period_effective_end_date": "2018-06-30",
								"reported_date": "2018-04-12",
								"forecast": "56860",
								"forecast_unit": "None",
								"correlation": "None",
								"r_squared": "None",
								"metric_periodicity": "Quarter_Over_Quarter",
								"entity_name": "Netflix",
								"metric_name": "DownloadsAndroidiOS",
								"metric_id": "768"
								}
					,{ "company": "Netflix, Inc.",
								"metric_name_reported": "U.S. Subscribers",
								"period_effective_start_date": "2018-04-01",
								"period_effective_end_date": "2018-06-30",
								"reported_date": "2018-04-26",
								"forecast": "57752",
								"forecast_unit": "None",
								"correlation": "None",
								"r_squared": "None",
								"metric_periodicity": "Quarter_Over_Quarter",
								"entity_name": "Netflix",
								"metric_name": "DownloadsAndroidiOS",
								"metric_id": "768"
							}
							, {"company": "Netflix, Inc.", "metric_name_reported": "U.S. Subscribers", "period_effective_start_date": "2018-04-01", "period_effective_end_date": "2018-06-30", "reported_date": "2018-05-10", "forecast": 56060, "forecast_unit": "None", "correlation": "None", "r_squared": "None", "metric_periodicity": "Quarter_Over_Quarter", "entity_name": "Netflix", "metric_name": "DownloadsAndroidiOS", "metric_id": 768}
							, {"company": "Netflix, Inc.", "metric_name_reported": "U.S. Subscribers", "period_effective_start_date": "2018-04-01", "period_effective_end_date": "2018-06-30", "reported_date": "2018-05-24", "forecast": 56968, "forecast_unit": "None", "correlation": "None", "r_squared": "None", "metric_periodicity": "Quarter_Over_Quarter", "entity_name": "Netflix", "metric_name": "DownloadsAndroidiOS", "metric_id": 768}
							, {"company": "Netflix, Inc.", "metric_name_reported": "U.S. Subscribers", "period_effective_start_date": "2018-04-01", "period_effective_end_date": "2018-06-30", "reported_date": "2018-06-07", "forecast": 58946, "forecast_unit": "None", "correlation": "None", "r_squared": "None", "metric_periodicity": "Quarter_Over_Quarter", "entity_name": "Netflix", "metric_name": "DownloadsAndroidiOS", "metric_id": 768}
					]
				}


        return (
            isUserInGroups(AppConfig.permissionGroups['avenueapi']) ? (
                <div className="api-instruction">
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_get_started : !this.state.des_get_started})}>Getting Started <Glyphicon glyph={this.state.des_get_started ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_get_started}>
														<div>
															<h4 className='description'>The Key Metrics API enables seamless access to 7Park Data’s portfolio of leading performance indicators, forecasts, and backtests.<br/><br/>For full documentation, please visit: <a href="https://developers.7parkdata.com">developers.7parkdata.com</a> <br/><br/> For assistance with the Key Metrics API, please contact <a href="mailto:support@7parkdata.com">support@7parkdata.com</a>.</h4>
														</div>
												</Collapse>
										</div>
                    <br/>
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_auth : !this.state.des_auth})}>Authentication <Glyphicon glyph={this.state.des_auth ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_auth}>
                            <div>
                                <h4 className='description'>7Park Data uses OAuth to authorize users to its APIs.</h4>
                                <h4 className='description'>To generate a client id and client secret, click “Request Credentials” below. Be sure to save the client secret, because it cannot be retrieved again.</h4>
                                <hr />
                                <div className="client-key-list">
                                {(this.state.client_id && this.state.client_secret) ?
                                <p className="token"><b>Client ID:</b> {this.state.client_id}<br/> <b>Client Secret:</b> {this.state.client_secret}</p>:<button className="api-instruction-button" onClick={this.handleClick} disabled={this.state.apps.length >= 2}>{this.state.apps.length >= 2 ? " Credential Request Disabled (Too many keys.)" : "Request Credentials"}</button>
                                }
                                </div>
                                <AppList apps={this.state.apps}/>
                            </div>
                        </Collapse>
                    </div>
                    {/* <br/>
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_rate : !this.state.des_rate})}>Rate Limits <Glyphicon glyph={this.state.des_rate ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_rate}>
                            <div>
                                <h4 className='description'>Client applications are rate limited to 5000 requests/week and 5 requests/sec.</h4>
                                <h4 className='description'>Contact <a href="mailto:support@7parkdata.com">support@7parkdata.com</a> to increase your rate limit.</h4>
                            </div>
                        </Collapse>
                    </div>

                    <br/>

                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_auth_example : !this.state.des_auth_example})}>Example: Authenticate a Request <Glyphicon glyph={this.state.des_auth_example ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_auth_example}>
													<div>
                                <h5>Use a client_id and client_secret to request an access token from the /oath/token endpoint.</h5>
                                <h5>Request:</h5>
                                <p className='code-block'>curl -XPOST https://api.7parkdata.com/oauth/token -H &quot;Content-Type: application/json&quot; -d &apos;&#123;&quot;client_id&quot;:&quot;<span className='variable'>client_id</span>&quot;,&quot;client_secret&quot;:&quot;<span className='variable'>client_secret</span>&quot;&#125;&apos;</p>
                                <h5>Response:</h5>
                                <p className='code-block'>&#123;"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1N....", "expires_in":86400, "token_type":"Bearer"&#125;</p>
                                <h5>The access token is valid for 24hrs.</h5>
                                <h5>To authenticate requests to other API endpoints, include the access token in the authorization header:<i>-H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;</i> </h5>
                                <p className='code-block'>
                                eg.<br/>
                                curl https://api.7parkdata.com/companies?search=<span className='variable'>company_name</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
                                curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metrics -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
                                curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metric/<span className='variable'>metric_id</span>/entities -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>...
																<br/>...
                                </p>
													</div>
												</Collapse>
                    </div>

                    <br />

                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_ts : !this.state.des_ts})}>Example: Retrieve Time Series Data <Glyphicon glyph={this.state.des_ts ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_ts}>
                            <div>
                                <h5>This example demonstrates how to search the API for Netflix - US - Subscription trends. The Netflix Subscription Index is available for over 100 countries in daily or quarterly growth rate formats.</h5>
                                <h5>Use the meta-data endpoints: /companies /metrics and /entities to search for the company, metric, and entity of the time series.</h5>
                                <h5>Then, use the /queries endpoint to retrieve a list of detailed dimensions and regions of the time series.</h5>
                                <h5>Last, provide the detailed dimensions to the /data endpoint to retrieve a specific time series.</h5>
                                <h5>Note: Values entered into the /data endpoint are <i>case sensitive</i>. They must be entered <i>exactly as they appear</i> in the /queries response object. eg. ...&metric_periodicity=Daily&... returns results, but ...&metric_periodicity=daily&... does not return results.</h5>
                                <hr />
                                <h5>With an authentication token (see: <i>Example: Authenticate a Request</i>), search the /companies endpoint to identify available companies.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/companies?search=<span className='variable'>company_name</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>
                                curl https://api.7parkdata.com/companies?search=<span className='variable'>ticker</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg. search for Netflix forecasts:<br/>
                                curl https://api.7parkdata.com/companies?search=<span className='variable'>Netflix</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>
                                curl https://api.7parkdata.com/companies?search=<span className='variable'>NFLX</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                </p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(companiesExample, null, 2)}</pre>

                                <h5>Next, with an authentication token (see: <i>Example: Authenticate a Request</i>), search the /metrics endpoint to identify available metrics for a given company.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metrics -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg. search for Netflix metrics:<br/>
                                curl https://api.7parkdata.com/company/<span className='variable'>4354</span>/metrics -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                </p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(metricsExample, null, 2)}</pre>

                                <h5>Next, with an authentication token (see: <i>Example: Authenticate a Request</i>), search the /entities endpoint to identify available entities for a given company and metric.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metric/<span className='variable'>metric_id</span>/entities -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg.:<br/>
																curl https://api.7parkdata.com/company/<span className='variable'>4354</span>/metric/<span className='variable'>172</span>/entities -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                </p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(entitiesExample, null, 2)}</pre>

                                <h5>Next, with an authentication token (see: <i>Example: Authenticate a Request</i>), search the /queries endpoint to identify grains at which time series are tracked for a given company, metric, and entity.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
																curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metric/<span className='variable'>metric_id</span>/entity/<span className='variable'>entity_id</span>/queries -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg.:<br/>
																curl https://api.7parkdata.com/company/<span className='variable'>4354</span>/metric/<span className='variable'>172</span>/entity/<span className='variable'>46399</span>/queries -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																</p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(queriesExample, null, 2)}</pre>
                                <h5>Last, with an authentication token (see: <i>Example: Authenticate a Request</i>), search the /data endpoint to retrieve the time series.
                                Use all the key-value attributes returned in the /queries response as querystring parameters for the /data request.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl &quot;https://api.7parkdata.com/data?<span className='variable'>key_1</span>=<span className='variable'>val_1</span>&<span className='variable'>key_2</span>=<span className='variable'>val_2</span>&<span className='variable'>key_3</span>=<span className='variable'>val_3</span>&...&<span className='variable'>key_N</span>=<span className='variable'>val_N</span>&respformat=nested&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg.:<br/>
																curl &quot;https://api.7parkdata.com/data?<span className='variable'>entity_id</span>=<span className='variable'>46399</span>
																&<span className='variable'>metric_id</span>=<span className='variable'>172</span>
																&<span className='variable'>metric_periodicity</span>=<span className='variable'>Daily</span>
																&<span className='variable'>discovery_name</span>=<span className='variable'>Netflix</span>
																&<span className='variable'>company_name</span>=<span className='variable'>Netflix,%20Inc.</span>
																&<span className='variable'>country_name</span>=<span className='variable'>United%20States%20of%20America</span>
																&respformat=nested&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
																curl &quot;https://api.7parkdata.com/data?<span className='variable'>entity_id</span>=<span className='variable'>46399</span>
																&<span className='variable'>metric_id</span>=<span className='variable'>172</span>
																&<span className='variable'>metric_periodicity</span>=<span className='variable'>Daily</span>
																&<span className='variable'>discovery_name</span>=<span className='variable'>Netflix</span>
																&<span className='variable'>company_name</span>=<span className='variable'>Netflix,%20Inc.</span>
																&<span className='variable'>world_region_name</span>=<span className='variable'>North%20America</span>
																&respformat=nested&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
																curl &quot;https://api.7parkdata.com/data?<span className='variable'>entity_id</span>=<span className='variable'>46399</span>
																&<span className='variable'>metric_id</span>=<span className='variable'>172</span>
																&<span className='variable'>metric_periodicity</span>=<span className='variable'>Daily</span>
																&<span className='variable'>discovery_name</span>=<span className='variable'>Netflix</span>
																&<span className='variable'>company_name</span>=<span className='variable'>Netflix,%20Inc.</span>
																&<span className='variable'>us_region_name</span>=<span className='variable'>North%20Eastern%20United%20States</span>
																&respformat=nested&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																</p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(dataExample, null, 2)}</pre>
                            </div>
                        </Collapse>
                    </div>
                    <br />
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_forecast : !this.state.des_forecast})}>Example: Retrieve a Forecast <Glyphicon glyph={this.state.des_forecast ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_forecast}>
                            <div>
                                <h5>This example demonstrates how to retrieve 7Park Data's latest forecast for: Netflix - US Subscribers.</h5>
                                <h5>Use the /forecasts metadata endpoint to discover what metrics 7Park Data forecasts. Then use the company-metric-entity id values to retrieve our latest forecast from the /forecast endpoint. Note that some metrics have multiple forecasts, each built from different growth rate models.</h5>
                                <hr />
                                <h5>With an authentication token (see: <i>Example: Authenticate a Request</i>), search the /forecasts endpoint for a list of metrics that 7Park Data forecasts.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/forecasts?search=<span className='variable'>company_name</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg. search for Netflix forecasts:<br/>
																curl https://api.7parkdata.com/forecasts?search=Netfl -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                </p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(forecastsExample, null, 2)}</pre>
                                <h5>Next, with an authentication token (see: <i>Example: Authenticate a Request</i>), search the /forecast endpoint using meta-data retrieved from the /forecasts response.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metric/<span className='variable'>metric_id</span>/entity/<span className='variable'>entity_id</span>/forecast -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg. Look up the U.S. Subscribers forecast derived from App Downloads.<br/>
																curl https://api.7parkdata.com/company/<span className='variable'>4354</span>/metric/<span className='variable'>740</span>/entity/<span className='variable'>1928290</span>/forecast -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																</p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(forecastExample, null, 2)}</pre>
                            </div>
                        </Collapse>
                    </div>
                    <br />
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_forecast_history : !this.state.des_forecast_history})}>Example: Retrieve Historical Forecasts<Glyphicon glyph={this.state.des_forecast_history ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_forecast_history}>
                            <div>
                                <h5>This example demonstrates how to retrieve 7Park Data's historical forecasts for Netflix - US Subscribers.</h5>
                                <h5>Use the /forecasts metadata endpoint to discover what metrics 7Park Data forecasts. Then use the company-metric-entity id values to retrieve historical forecasts from the /forecast/history endpoint. Note that some metrics have multiple forecasts, each built from different growth rate models.</h5>
                                <hr />
                                <h5>With an authentication token (see: <i>Example: Authenticate a Request</i>), search the /forecasts endpoint for a list of metrics that 7Park Data forecasts.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/forecasts?search=<span className='variable'>company_name</span> -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg. search for Netflix forecasts:<br/>
																curl https://api.7parkdata.com/forecasts?search=Netfl -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                </p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(forecastsExample, null, 2)}</pre>
                                <h5>Next, with an authentication token (see: <i>Example: Authenticate a Request</i>), search the /forecast/history endpoint using meta-data retrieved from the /forecasts response.</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl https://api.7parkdata.com/company/<span className='variable'>company_id</span>/metric/<span className='variable'>metric_id</span>/entity/<span className='variable'>entity_id</span>/forecast/history -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg. Look up the historical forecasts for Netflix's U.S. Subscribers.<br/>
																curl https://api.7parkdata.com/company/<span className='variable'>4354</span>/metric/<span className='variable'>740</span>/entity/<span className='variable'>1928290</span>/forecast/history -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																</p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(forecastHistoryExample["data"], null, 2)}</pre>
                            </div>
                        </Collapse>
                    </div>
                    <br />
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_forecast_ts : !this.state.des_forecast_ts})}>Example: Retrieve Quarterly Growth Rates Related to a Forecast <Glyphicon glyph={this.state.des_forecast_ts ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_forecast_ts}>
                            <div>
                                <h5>This example demonstrates how to retrieve the growth rates associated with 7Park Data's latest forecast for: Netflix - US Subscribers.</h5>
                                <h5>Use meta-data from the /forecast endpoint response (see example: <i>Example: Retrieve a Forecast</i>) to query the /data endpoint for the growth rates used to predict the given forecast.</h5>
                                <hr />
                                <h5>With an authentication token (see: <i>Example: Authenticate a Request</i>), search the /data endpoint replacing entity_id, metric_id, and metric_periodicity with the following values from the /forecast response:</h5>
                                <h5><span className='variable'>entity_id</span> : response["data"][<span className='variable'>n</span>]["queries"][<span className='variable'>m</span>]["entity_id"]</h5>
                                <h5><span className='variable'>metric_id</span> : response["data"][<span className='variable'>n</span>]["queries"][<span className='variable'>m</span>]["metric_id"]</h5>
                                <h5><span className='variable'>metric_periodicity</span> : response["data"][<span className='variable'>n</span>]["queries"][<span className='variable'>m</span>]["metric_periodicity"]</h5>
                                <h4>Request:</h4>
                                <p className='code-block'>
                                curl &quot;https://api.7parkdata.com/data?entity_id=<span className='variable'>entity_id</span>&metric_periodicity=<span className='variable'>metric_periodicity</span>&metric_id=<span className='variable'>metric_id</span>&respformat=flat&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
                                <br/>eg.:<br/>
                                <i>#Growth rates for 7Park's LPI's (based on quarter over quarter growth calculations):</i><br/>
																curl &quot;https://api.7parkdata.com/data?entity_id=<span className='variable'>1916255</span>&metric_periodicity=<span className='variable'>Quarter_Over_Quarter</span>&metric_id=<span className='variable'>768</span>&respformat=flat&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
                                <br/>
                                <i>#Growth rates for Netflix's reported US Subscribers (based on quarter over quarter growth calculations):</i><br/>
																curl &quot;https://api.7parkdata.com/data?entity_id=<span className='variable'>1916255</span>&metric_periodicity=<span className='variable'>Quarter_Over_Quarter</span>&metric_id=<span className='variable'>704</span>&respformat=flat&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
                                <br/>
                                <i>#Growth rates for 7Park's LPI's (based on year over year growth calculations):</i><br/>
																curl &quot;https://api.7parkdata.com/data?entity_id=<span className='variable'>1916255</span>&metric_periodicity=<span className='variable'>Year_Over_Year</span>&metric_id=<span className='variable'>768</span>&respformat=flat&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
                                <br/>
                                <i>#Growth rates for Netflix's reported US Subscribers (based on year over year growth calculations):</i><br/>
																curl &quot;https://api.7parkdata.com/data?entity_id=<span className='variable'>1916255</span>&metric_periodicity=<span className='variable'>Year_Over_Year</span>&metric_id=<span className='variable'>704</span>&respformat=flat&quot; -H &quot;accept: application/json&quot; -H &quot;Authorization: Bearer <span className='variable'>access_token</span>&quot;
																<br/>
																<br/>
                                </p>
                                <h4>Response:</h4>
                                <pre className='code-block'>{JSON.stringify(dataExample2, null, 2)}</pre>
                            </div>
                        </Collapse>
                    </div>
                    <br />
                    <div className='des-section'>
                        <p className='des-topic' onClick={()=> this.setState({des_other : !this.state.des_other})}>Other Resources <Glyphicon glyph={this.state.des_other ? "menu-up" : "menu-down"}/></p>
                        <Collapse in={this.state.des_other}>
                            <div>
                                <h4 className='description'><a href="https://app.swaggerhub.com/apis-docs/7park/7-park_api/">Swagger Documentation</a> -- API Documentation for all available endpoints & Test UI</h4>
                                <h4 className='description'><a href="https://github.com/sevenpark/7ParkPublic/blob/master/scripts/key_metric_interactive.py">Python Interactive Script</a> -- Python package for interacting with API</h4>
                            </div>
                        </Collapse>
                    </div> */}
                    <hr className='hori-bar'/>
                </div> ) :
                <div>
                    <p>You do not have access</p>
                </div>
        );
    }
}

export default ApiInstruction;
