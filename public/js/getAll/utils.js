const panggilApi = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        })
        
        //Jika request berhasil
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }

    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem('token'); //Hapus token sampah jika error
        window.location.href = '/login';
    }

}
