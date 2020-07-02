import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Factory} from '../../interfaces/factory.interface'
import {mainService} from '../../services/main.service'


@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.css']
}) 

export class FactoryComponent implements OnInit  {

    public FactoryList: Factory[];
    public nameinput: string;
    public country: string;
    public searchId:string;
    public Postanswer='';
    

    title = 'Заводы';

    public SetClick():void {
        this.mainService.Factory$.subscribe((f:Factory[])=> this.FactoryList = f);
        this.mainService.getFactory();

        this.FactoryList.forEach(element=> {
            if (this.searchId==element.id.toString()) {
                this._router.navigate(['/Factorys/'+this.searchId]);
            }
        })
        this.Postanswer='*Не найден такой ID';
        this.FactoryList.length=0;
    }

    constructor(private mainService: mainService, private activatedRoute: ActivatedRoute, 
        private _router: Router){
    }

    ngOnInit():void {
        this.mainService.Factory$.subscribe((f:Factory[])=> this.FactoryList = f);
        this.mainService.getFactory();
        this.nameinput='';
        this.country='';
        this.searchId='';
        this.Postanswer='';
        
    }

    public addFactory():void {
        if (!this.mainService.CheckRights()) {
            return;
        }
        //console.log(this.nameinput);
        this.mainService.setFactory({name: this.nameinput, country: this.country})
        .subscribe(res=>{this.Postanswer=res;});  

        this.mainService.Factory$.subscribe((f:Factory[])=> this.FactoryList = f);
        this.mainService.getFactory();
    }
   

}

