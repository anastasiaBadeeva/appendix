// eslint-disable-next-line init-declarations
let viz;

const loadTableauPage = vizUrl => {
  const vizContainer = document.getElementById('vizContainer');
  const options = {
    width: '100%',
    height: '100%',
    hideTabs: true,
  };
  if (viz) {
    viz.dispose();
  }
  
  viz = new window.tableau.Viz(vizContainer, vizUrl, options);
};

export const switchTab = label => {
  const sheet = viz.getWorkbook();
  sheet.activateSheetAsync(label)
};

export const lastMile = () => {
  const vizUrl = 'https://prod-useast-a.online.tableau.com/t/7parkdata/views/LastMile-RLSupdate1/MarketSelection';
  loadTableauPage(vizUrl);
};

export const marketExploration = () => {
  const vizUrl = 'https://prod-useast-a.online.tableau.com/t/7parkdata/views/MarketDiscovery/MarketExploration';
  loadTableauPage(vizUrl);
};

export const crcForecast = () => {
  const vizUrl = 'https://prod-useast-a.online.tableau.com/t/7parkdata/views/CRCForecastDashboard/MSAForecast';
  loadTableauPage(vizUrl);
};

export const propertyInsights = () => {
  const vizUrl = 'https://prod-useast-a.online.tableau.com/t/7parkdata/views/PopulationInsightsDashboard/Overview';
  loadTableauPage(vizUrl);
};
