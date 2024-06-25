async function handleSubmitWhatsappMessage(phone, message) {
    const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

    try {
        const response = await fetch(GZAPPY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user_token_id': 'f906fa28-ff97-4afb-9a35-bf09191006b1'
            },
            body: JSON.stringify({
                instance_id: 'SY20G1WN9KRQRFLZA3L2GT5O',
                instance_token: 'ab3558d7-bebd-4d77-9adc-eb1906c9ea7e',
                message: message,
                phone: phone
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Erro desconhecido');
        }
        console.log(data);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}
