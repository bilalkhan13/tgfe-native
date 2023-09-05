const apiHost = 'https://bakesaleforgood.com'

  export async function fetchInitialDeals() {
    try {
      let response = await fetch(apiHost + '/api/deals');
      let responseJson = await response.json();
      return responseJson
    } catch(error) {
      console.log(error);
    }
  };

  export async function fetchDealDetail(id) {
    try {
      let response = await fetch(apiHost + '/api/deals/' + id);
      let responseJson = await response.json();
      return responseJson
    } catch(error) {
      console.log(error);
    }
  }

  export async function fetchDealsSearchResults(searchTerm) {
    try {
      let response = await fetch(apiHost + '/api/deals/?searchTerm=' + searchTerm);
      let responseJson = await response.json();
      return responseJson
    } catch(error) {
      console.log(error);
    }
  }


