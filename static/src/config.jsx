export const AppConfig = {

	appNames: {
		'mediadashboard': 'Media & Entertainment Dashboard',
		'tableaudashboard': 'Tableau Dashboards',
		'akm2dashboard': 'Key Metrics Dashboard',
		'catalog': 'Report Catalog',
		'avenueapi': 'Avenue API',
		'shiny': 'Shiny Server',
		'accountmanagement': 'Account Management',
		'reported': 'Reported Metrics',
		'realmarkets': 'Real Markets'
	},

	dashboardsGroups: {
		lastMile: ['Dashboard: Last Mile'],
		crcForecast: ['Dashboard: CRC Rent Forecast'],
		propertyInsights: ['Dashboard: Property Insights'],
		marketExploration: ['Dashboard: Market Exploration'],
	},
	reportsGroups: {
		rentGrowth: ['Report: Rent Growth'],
		employmentTrends: ['Report: Employment Trends'],
		lastMileInvestors: ['Report: Last Mile Investors'],
		consumerSpendingImpact: ['Report: Consumer Spending Impact'],
		incomeEmploymentData: ['Report: Data Driven Decision Making'],
	},
	datasetsGroups: {
		Geosocial: ['Dataset: Geosocial'],
		JobPostings: ['Dataset: Job Postings'],
		RentalRates: ['Dataset: Rental Rates'],
		ConsumerSpend: ['Dataset: Consumer Spend'],
		TruckingRoutes: ['Dataset: Trucking Routes'],
		IndustrialPois: ['Dataset: Industrial POIs'],
		HousingPermits: ['Dataset: Housing Permits'],
		IncomeAndEmployment: ['Dataset: Income & Employment'],
	},

	appUrl: window.location.hostname === 'localhost'
		? 'http://localhost:8888'
		: window.location.hostname === 'account-dev.markerr.com'
		? 'https://account-dev.markerr.com'
		: 'https://account.markerr.com',

	avenueUrl: 'https://avenue-api.markerr.com',

	domoSSOUrl: 'https://login.markerr.com/samlp/Wou8KzZgdkq8frkcbThC4jDAFyHs1QxA?connection=Username-Password-Authentication&RelayState=https://markerr.domo.com/auth/saml',

	tableauSSOUrl: 'https://login.markerr.com/samlp/P3ohksyaT4YXPNAXTxjitj1U1YAvmVBi?connection=Username-Password-Authentication',

	embeddedDashboardUrl: 'http://dashboard.markerr.com',

	excelAddInUrl: 'https://appsource.microsoft.com/en-us/product/office/WA104381438?src=office&tab=Overview',

	accountmanagementUrl: 'https://account-management.markerr.com',

	ssoAppConfig: {
		akm2dashboard: {
			cliendId: 'zM9RfGmr7EezlNL3C9qF0Zb7XUTyFI6t',
			redirectUri: 'https://akmdashboard.markerr.com/callback.html'
		},
		catalog: {
			cliendId: 'Q6CICaGMtE9a2IhJWPbEpr9rJj7bNt1j',
			redirectUri: 'https://catalog.markerr.com/callback.html'
		},
		demo: {
			cliendId: 'f80mrApovZZfI0Q7MiAUUvCB2sNPbst9',
			redirectUri: 'https://demo-dev.markerr.com/callback-dev.html?redirect=demo'
		},
		nerl: {
			cliendId: 'f80mrApovZZfI0Q7MiAUUvCB2sNPbst9',
			redirectUri: 'https://extract.markerr.com/callback.html?redirect=nerl'
		},
		shiny: {
			cliendId: 'swwrsg6Ve2YnOLxQKkvkoG2KjhVX8n0f',
			redirectUri: 'https://alpha.markerr.com/callback'
		},
		directory: {
			cliendId: 'RdvX3ATrQ1kmeOPDDyphDUOTD46uswX2',
			redirectUri: 'https://discover.markerr.com/auth/'
		},
		accountmgnt: {
			cliendId: 'gmzwdYLiM1e2Jvur2RzIyI934GeBnGWy',
			redirectUri: 'https://account-management.markerr.com/callback.html'
		},
		reported: {
			cliendId: 'c0kavJBXjMB0V2HC0vTP1m7WVMKQdJp6',
			redirectUri: 'https://referencedata.markerr.com/callback.html'
		},
		realproperties: {
			cliendId: 'fdyvyugC24PvKuP5zrnUvzYdMJ5kJ85F',
			redirectUri: 'https://realproperties.markerr.com/auth0/callback'
		},
		realmarkets: {
			cliendId: 'lEmS6aJtGGWf1AbjvvejjILVnemplUWN',
			redirectUri: 'https://realmarkets.markerr.com/oauth-authorized/auth0',
			responseType: 'code'
		}
	}
};
