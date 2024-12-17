import axios from 'axios';


class NotificationService {
    public static async sendNotification(recipient: string, movieName: string): Promise<void> {
        const notificationUrl = process.env.notification_service_url ;
        const emailData = {
            recipient, // Dirección de correo electrónico
            movie: movieName, // Nombre de la película
        };

        try {
            await axios.post(`${notificationUrl}/PuebaConexion`, emailData);
            console.log('Correo enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw new Error('Failed to send notification'); // Lanza un error si falla
        }
    }
}

export default NotificationService;
