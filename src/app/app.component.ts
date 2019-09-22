import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css' ;
import grapesjs from 'grapesjs/dist/grapes.js'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  editor;
  questions:string[]=[];
  idOfQuestionDragged;
  mappingobj={};

    ngOnInit(){

      this.editor = grapesjs.init({

        // Indicate where to init the editor. You can also pass an HTMLElement
        container: '#gjs',

        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,

        // Size of the editor
        height: '93vh',
        width: '74vw',

        // Disable the storage manager for the moment
        // storageManager: false,
        // Avoid any default panel
        // panels: { defaults: [] },
        //creating dragable components using blocks
        canvas: {

          styles: ['https://fonts.googleapis.com/css?family=Archivo+Narrow:400,400i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i&subset=latin,latin-ext',
          'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap'],

      },
        blockManager: {
          // appendTo: '#blocks',
          blocks: [
            {
              id: 'Text',
              label: 'Text',
              content: '<p style="font-family:Roboto"> Insert your text here</p >',

            }, {

              id: 'image',
              label: 'Image',
              // Select the component once it's dropped
              select: true,
              // You can pass components as a JSON instead of a simple HTML string,
              // in this case we also use a defined component type `image`
              content: { type: 'image' },
              // This triggers `active` event on dropped components and the `image`
              // reacts by opening the AssetManager
              activate: true,

            }
            ,{

              id: 'FieldWithText',
              label: 'Field WithText',
              content: '<div> <p style="font-family:Roboto"> Some Text followed by <span type="text"  > _______ </span> some more text </p></div> ',

            },{

              id:"Field",
              label:'Field',
              content:'<span > _______ </span>'

            },{

              id:"OfflineField",
              label:'Offline Field',
              content:'<span> ............................................................................................................... </span>'

            },{

              id:'One_Column',
                label: '1 Column',
                content: `
                <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                  <div class="row-cell" data-gjs-draggable=".row"></div>
                </div>
                <style>
                  .row {
                    display: flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    flex-wrap: nowrap;
                    padding: 10px;
                    min-height: 75px;
                  }
                  .row-cell {
                    flex-grow: 1;
                    flex-basis: 100%;
                    padding: 5px;
                  }
                </style>
              `,

            }
            ,{

              id:'two_Columns',
                label: '2 Columns',
                content: `
                <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                  <div class="row-cell" data-gjs-draggable=".row"></div>
                  <div class="row-cell" data-gjs-draggable=".row"></div>
                </div>
                <style>
                  .row {
                    display: flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    flex-wrap: nowrap;
                    padding: 10px;
                    min-height: 75px;
                  }
                  .row-cell {
                    flex-grow: 1;
                    flex-basis: 100%;
                    padding: 5px;
                  }
                </style>
              `,

            },{

              id:'three_Columns',
              label:'3 Columns',
              content: `
                <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                  <div class="row-cell" data-gjs-draggable=".row"></div>
                  <div class="row-cell" data-gjs-draggable=".row"></div>
                  <div class="row-cell" data-gjs-draggable=".row"></div>
                </div>
                <style>
                  .row {
                    display: flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    flex-wrap: nowrap;
                    padding: 10px;
                    min-height: 75px;
                  }
                  .row-cell {
                    flex-grow: 1;
                    flex-basis: 100%;
                    padding: 5px;
                  }
                </style>
              `,

            }
          ]
        },

        storageManager: {

          id: 'mj-',             // Prefix identifier that will be used inside storing and loading
          type: 'local',          // Type of the storage
          autosave: true,         // Store data automatically
          autoload: true,         // Autoload stored data on init
          stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
          storeComponents: true,  // Enable/Disable storing of components in JSON format
          storeStyles: true,      // Enable/Disable storing of rules in JSON format
          storeHtml: true,        // Enable/Disable storing of components as HTML string
          storeCss: true,         // Enable/Disable storing of rules as CSS string

        }

      });


      this.editor.Panels.addPanel({

        id: 'panel-top',
        el: '.panel__top',

      });

      this.editor.Panels.addPanel({

        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
          {
            id: 'visibility',
            active: true, // active by d efault
            className: 'btn-toggle-borders',
            label: '<u>B</u>',
            command: 'sw-visibility', // Built-in command
          }, {
            id: 'export',
            className: 'btn-open-export',
            label: 'Exp',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
          }, {
            id: 'show-json',
            className: 'btn-show-json',
            label: 'JSON',
            context: 'show-json',
            command(editor) {
              editor.Modal.setTitle('Components JzSON')
                .setContent(`<textarea style="width:100%; height: 250px;">
                  ${JSON.stringify(editor.getComponents())}
                </textarea>`)
                .open();
            },
          }
        ],
      });

      this.addFonts();
      this.renderConditionManager();
      this.setConditionTab();
      this.addingDropevent();

    }



  questionCollapse(index){

    console.log('demo'+index+1);
    this.selectConditionTab();

    if(document.getElementById('demo'+(index+1)).className === "collapse"){

      document.getElementById('demo'+(index+1)).className="show";

    }else{

      document.getElementById('demo'+(index+1)).className="collapse";
    }
  }

  addQuestion(){

    this.questions.push("<h1>How are you ?</h1>");
    // for(let i=0 ; i<this.questions.length;i++){
    //   document.getElementById('question'+i).addEventListener('ondragstart',this.onQuestionDragEvent);
    // }

  }

  onQuestionDragEvent(event){

    console.log(event);
    this.idOfQuestionDragged = event.target.id;
    console.log(this.idOfQuestionDragged);
    // console.log(event.dataTransfer.setData("text", event.target.id));

  }

    renderConditionManager(){

      const htmlinnerstring = document.getElementsByClassName('gjs-pn-views-container')[0];
      const node = document.createElement('div');
      node.innerHTML = '<div id="conditionmanager"  style="display:none"><p><h3>Mritunjay yadav</h3> </p>'+
      '</div>';
      node.addEventListener("click",this.selectConditionTab);
      htmlinnerstring.appendChild(node);

    }

    hideconditionmanager(){

      console.log('asdfasd');

    }

    setConditionTab(){

      (document.getElementsByClassName('condition')[0].id="mycondi");

    }

    selectConditionTab = () => {

      console.log("change the data ");
      document.getElementById('mycondi').click();
      document.getElementById('conditionmanager').style.display='block';
      console.log(document.getElementById('conditionmanager').style.display);

    }

    //inserting custom fonts into typography
    addFonts = () => {

      let styleManager = this.editor.StyleManager;
      console.log(styleManager.getSector('typography'));
      let typographySector = styleManager.getSector('typography');
      let fontProperty = styleManager.getProperty('typography', 'font-family');
      let list = fontProperty.get('list');
      list.push({ value: 'Roboto, Arial, sans-serif', name: 'Roboto' });
      fontProperty.set('list', list);
      styleManager.render();

    }

    addingDropevent(){

      let document = this.editor.Canvas.getDocument();
      console.log(document.getElementById('hell'));
      document.getElementById('wrapper').addEventListener('drop',this.ondropEvent.bind(this));

    }


    ondropEvent(event){

      // event.preventDefault();
      console.log('question with id '+this.idOfQuestionDragged+"  will be mapped to field with id "+event.target.id);
      console.log('inside drag event catcher');
      console.log(this.idOfQuestionDragged);
      this.idOfQuestionDragged = null;
      // let data= event.dataTransfer.getData('text');
      // console.log(data);
      // console.log(event.dataTransfer.setData('text'));

    }



}


