const panggilApiGetProduk = async (endpoint, options = {}) => {

    try {
        
         const response = fetch(endpoint, {
            ...options
         });

         const data = await response.json();
         console.log(data);

    } catch (error) {
    //     console.error("Error:", error)
    //     localStorage.removeItem('token');
    //     window.location.href = '/login';
    }

}