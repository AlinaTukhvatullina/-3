import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Pipe} from '../../interfaces/pipe.interface'
import {mainService} from '../../services/main.service'

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.css']
})

export class PipeComponent implements OnInit {

    public PipeList: Pipe[];
    public nameinput: string;
    public dlinainput: string;
    public diaminput: string;
    public FactId:number;
    public searchId:string;
    public Postanswer='';
    public searchName:string;

    title = 'Трубы';


    constructor(private mainService: mainService,  private activatedRoute: ActivatedRoute, private _router: Router
        ){
        
    }
    
    public SetClick():void {
        this.mainService.Pipe$.subscribe((a:Pipe[])=> this.PipeList = a);
        this.mainService.getPipes();

        this.PipeList.forEach(element=> {
            if (this.searchId==element.id.toString()) {
                this._router.navigate(['/Pipes/'+this.searchId]);
            }
        })
        this.Postanswer='*Не найден такой ID';
        this.PipeList.length=0;
    }
    
    ngOnInit():void {
        this.mainService.Pipe$.subscribe((a:Pipe[])=> this.PipeList = a);
        this.mainService.getPipes();
        this.nameinput=''; 
        this.dlinainput='';
        this.diaminput=''; 
        this.FactId=0;
        this.Postanswer='';
    };

    public addPipe():void {
        if (!this.mainService.CheckRights()) {
            return;
        }
        this.mainService.setPipe({name: this.nameinput, dlina: this.dlinainput, diam: this.diaminput, FactoryId: this.FactId})
        .subscribe(res=>{this.Postanswer=res;}); 

        this.mainService.Pipe$.subscribe((a:Pipe[])=> this.PipeList = a);
        this.mainService.getPipes();
        
    }

    public GetByName():void {
        this.mainService.Pipe$.subscribe((a:Pipe[])=> this.PipeList = a);
        this.mainService.getPipeByName(this.searchName);
    }

    public GoToPipe(id:number):void{
        this._router.navigate(['/Pipes/'+id]);
    }




}

