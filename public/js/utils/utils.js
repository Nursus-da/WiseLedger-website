const panggilApi = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        })

        //Cek apakah server menolak token (401/403)
        if (!response.ok) {
            throw new Error("Token tidak valid");
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem('token'); //Hapus token sampah jika error
        window.location.href = '/login';
    }

}
