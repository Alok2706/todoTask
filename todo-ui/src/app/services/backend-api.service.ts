import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {CookieService} from 'ngx-cookie-service';
import {ToastrService} from 'ngx-toastr';
import {share} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  csrf_cookie = 'csrftoken';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastrService: ToastrService,
  ) {
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    };
    if (this.cookieService.get(this.csrf_cookie)) {
      headersConfig["X-CSRFToken"] = this.cookieService.get(this.csrf_cookie);
    }

    return new HttpHeaders(headersConfig);
  }


  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  private getErrorMsg(errors) {
    console.log('errors', errors);
    let errorMsg = '';
    let displayErrorsFrom = 'non_field_errors';

    if (Array.isArray(errors)) {
      errors.forEach(value => {
        errorMsg += this.getErrorMsg(value);
      });
    } else if (typeof errors === 'object') {
      for (let key in errors) {
        if (key == 'code' && errors[key] == '5000') {
          this.clearReload();
          break;
        }
        let value = this.getErrorMsg(errors[key]);
        errorMsg += `${value}`;
      }
    } else if (typeof errors == 'string') {
      errorMsg += errors;
    }
    return errorMsg;
  }

  private clearReload() {
    this.cookieService.deleteAll();
    window.location.reload();
  }

  private errorHandle(error: any) {
    let errors = error.error;
    let errorMsg = null;
    if (error.status == 0) {
      errorMsg = error.message;
    }

    if (error.error && error.error.code == '5000') {
      this.clearReload();
      return false;
    }

    if (error.status == 404 || error.status == 401) {
      if (error.error.detail) {
        this.clearReload();
        return false;
      }
    }

    if (!errorMsg) {
      errorMsg = this.getErrorMsg(errors);
    }

    if (!(error.status == 200)) {
      this.toastrService.error(errorMsg);
    }
  }

  get(path: string, params = {}) {
    const getObserver = this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params: new HttpParams({
          fromObject: params,
        }),
      })
      .pipe(share());
    getObserver.subscribe(null, (value) => {
      this.errorHandle(value);
    });
    return getObserver;
  }


  post(path: string, body: any = {}) {
    const postObserver = this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(share());
    postObserver.subscribe(null, (value) => {
      this.errorHandle(value);
    });
    return postObserver;
  }

  patch(path: string, body: any = {}) {
    const patchObserver = this.http
      .patch(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(share());
    patchObserver.subscribe(null, (value) => {
      this.errorHandle(value);
    });
    return patchObserver;

  }


  delete(path: string) {
    const deleteObserver = this.http
      .delete(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
      })
      .pipe(share());
    deleteObserver.subscribe(null, (value) => {
      this.errorHandle(value);
    });
    return deleteObserver;
  }
}
