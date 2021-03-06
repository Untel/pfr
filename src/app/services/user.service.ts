import { FirebaseListObservable } from 'angularfire2/database';
import { UiService } from './ui.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    public user$: Observable<User> = new Observable<User>();
    public users$: FirebaseListObservable<User[]>;
    private userId;

    constructor(private authService: AuthService, private af: AngularFire, ui: UiService) {
        this.user$ = this.authService.state$
            .do( auth => auth ? this.userId = auth.uid : null)
            .filter( auth => !!auth )
            .switchMap( auth => this.af.database.object(`/users/${auth.uid}`), ( auth, user: User ) => Object.assign({}, user, auth) );

        this.users$ = this.af.database.list('/users');
    }

    updateUser = (user: User) => {
        return this.af.database.object(`/users/${this.userId}`).update(user);
    }

    uploadProfilPicture = (b64Img) => {
        return this.af.database.object(`/users/${this.userId}/photo`).set(b64Img);
    }

    getUsers = () : Observable<User[]> => {
        return this.users$;
    }

    getCommercials = () : Observable<User[]> => {
        return this.getUsers()
            .map(users => users.filter(u => u.role === 'commercial'))
            .do(users => console.log('Commercials retrieved', users));
    }

    getClients = () : Observable<User[]> => {
        return this.getUsers()
            .map(users => users.filter(u => u.role === 'client'))
            .do(users => console.log('Clients retrieved', users));
    }

}
