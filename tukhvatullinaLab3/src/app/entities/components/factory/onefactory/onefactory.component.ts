import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Factory} from '../../../interfaces/factory.interface'
import {mainService} from '../../../services/main.service'

@Component({
    selector: 'app-onefactory',
    templateUrl: './onefactory.component.html',
    styleUrls: ['./onefactory.component.css']
})

export class onefactoryComponent implements OnInit {

    public onefactory: Factory;
    public id:string;
    public Pipes: string[];

    constructor(private mainService: mainService, private activatedRoute: ActivatedRoute, 
         ){
    }
    
    ngOnInit():void {
        //console.log(123);
        this.activatedRoute.url.subscribe(data=>{
            this.mainService.getOneFactory('/'+data[1].path)
            .subscribe(res=>{this.onefactory=res; console.log(this.onefactory)});
        
            this.mainService.getPipesOfFact(data[1].path).subscribe(res=>{this.Pipes=res});
        });
        //console.log(this.oneapp);
    }
}