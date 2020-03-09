import { environment } from 'environments/environment';

export const AppConfig = {
    endpoints: {
        graphql: environment.apiUrl + '/graphql',
        login: environment.apiUrl + '/api/login_check',
        profile_img: environment.apiUrl + '/',
        download: environment.apiUrl + '/download',
        avatar: environment.apiUrl + '/secure-api/api/avatar/:id=',
        upload: environment.apiUrl + '/files'
    }
} ;
