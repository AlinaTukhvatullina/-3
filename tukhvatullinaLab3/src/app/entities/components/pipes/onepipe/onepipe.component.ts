import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Pipe} from '../../../interfaces/pipe.interface'
import {mainService} from '../../../services/main.service'

@Component({
    selector: 'app-onepipe',
    templateUrl: './onepipe.component.html',
    styleUrls: ['./onepipe.component.css']
})

export class onepipeComponent implements OnInit {

    public onepipe: Pipe;
    public id:string;
    public FactoryName: string;

    constructor(private mainService: mainService, private activatedRoute: ActivatedRoute, 
         ){
    }
    
    ngOnInit():void {
        //console.log(123);
        this.activatedRoute.url.subscribe(data=>{
            this.mainService.getOnePipe('/'+data[1].path)
            .subscribe(res=>{this.onepipe=res; console.log(this.onepipe)});
        
            this.mainService.getFactoryPipe(data[1].path).subscribe(res=>{this.FactoryName=res});
        });
        //console.log(this.oneapp);
    }
}