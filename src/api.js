import $ from "jquery";

class Api {
    static parseResult(result) {
        try {
            return {
                success: true,
                result
            };
        } catch (error) {
            return {
                'success': false,
                'message': 'An unexpected error has occurred. We are working on it...',
            };
        }
    }

    static getSessionKey() {
        return session.session_key;
    }

    performCall(type, url, data, callback) {
        $.ajax({
            type,
            url,
            cache: false,
            data,
            success: (result) => {
                const response = Api.parseResult(result);
                if (response.result.vars) {
                    for(let i in resultObj.vars) {
                        session[i] = response.vars[i];
                    }
                }
                callback(response);
            },
            error: (xhr,status,error) => {
                console.error(error);
            }
        });

    }

    login(username, password, callback) {
        this.performCall(
            'POST', '/api/login', {
                username,
                password: password ? md5(`${password} ${username}`) : null,
            }, callback);
    }

    changePassword(username, password, callback) {
        this.performCall(
            'POST', '/api/change-password', {
                username,
                password: password ? md5(`${password} ${username}`) : null,
                session_key: Api.getSessionKey(),
            }, callback);
    }

    check(username, callback) {
        this.performCall(
            'GET', '/api/check', {
                username,
            }, callback);
    }

    signup(username, email, password, callback) {
        this.performCall(
            'POST', '/api/signup', {
                username,
                email,
                password: md5(`${password} ${username}`),
            }, callback);
    }

    logout(callback) {
        this.performCall(
            'POST', '/api/logout', {
                session_key: Api.getSessionKey(),
            }, callback);
    }

    recover(email, callback) {
        this.performCall(
            'POST', '/api/recover', {
                email,
            }, callback);
    }

    save(username, profile_image, password, old_password, callback) {
        this.performCall(
            'POST', '/api/save-profile', {
                profile_image,
                password: password ? md5(`${password} ${username}`) : null,
                old_password: old_password ? md5(`${old_password} ${username}`) : null,
                session_key: Api.getSessionKey(),
            }, callback);
    }

    youtube(callback) {
        this.performCall(
            'GET', 'https://vlog-api.herokuapp.com/youtube', {
            }, callback);
    }
}

export default Api;