class uploaderLab extends HTMLElement {
  constructor() {
    super();
    this.data = [];
    this.fileName = [];
    this.deletedSrc = [];
    this.totalLoaded = 0;
    this.allowedExtension = ["image/jpeg", "image/png", "image/svg+xml"];
    this.thumb_height = "300";
    this.resize_width = "100%";
    this.limitImage = 1;
  }
  get btnSelectText() {
    return this.hasAttribute("btnSelectText");
  }
  get btnDeleteText() {
    return this.hasAttribute("btnDeleteText");
  }
  get thumbHeight() {
    return this.hasAttribute("thumbHeight");
  }
  get getData() {
    return this.getAttribute("data");
  }
  get getNames() {
    return this.getAttribute("fileName");
  }
  process(e, drop) {
    //check if it is a selection or dropping
    if (drop == true) e.target.files = e.dataTransfer.files;

    //ckeck if there is invalid files
    var invalid = false;

    //is a valid extension?
    for (var b = 0; b < e.target.files.length; b++) {
      var el = this.allowedExtension.indexOf(e.target.files[b].type);
      if (el == -1) {
        invalid = true;
        break;
      }
    }

    //it is valid
    if (invalid == false) {
      var width = this.resize_width;

      //the total lenght of the array if we add all files from input
      var realLength = this.fileName.length * 1 + e.target.files.length;
      var forLength = 0;
      if (realLength <= this.limitImage) {
        //if it is valid we set the total with all files
        forLength = e.target.files.length;
      } else {
        //if it is not valid we set the total with -1 (add none)
        forLength = -1;
      }
      //if it is the firt time adding
      if (this.fileName.length == 0) {
        //if it's greater than the limit we take only the allowed length
        if (realLength > this.limitImage)
          forLength =
            e.target.files.length - (e.target.files.length - this.limitImage);
      }

      //reading the files
      for (var i = 0; i < forLength; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.name = e.target.files[i].name;
        reader.size = e.target.files[i].size;
        reader.totalToLoad = forLength;
        reader.cmp = this;
        reader.onload = function(event) {
          event.target.cmp.shadowRoot.querySelector(".loading").style.display =
            "block";

          //creating a thumbnail
          var imgMin = document.createElement("img");
          imgMin.style.width = "auto";
          imgMin.style.height = event.target.cmp.thumb_height + "px";
          imgMin.src = event.target.result;
          imgMin.totalToLoad = event.target.totalToLoad;
          imgMin.cmp = event.target.cmp;
          imgMin.onload = function(e) {
            var w = e.target.cmp.shadowRoot
              .querySelector(".total")
              .innerHTML.split("/");
            e.target.cmp.shadowRoot.querySelector(".total").innerHTML =
              w[0] * 1 + 1 + "/" + e.target.cmp.limitImage;
            e.target.cmp.totalLoaded++;
            if (e.target.cmp.totalLoaded == e.target.totalToLoad) {
              e.target.cmp.shadowRoot.querySelector(".loading").style.display =
                "none";
              e.target.cmp.totalLoaded = 0;
            }
          };

          //the close button
          var titMin = document.createElement("span");
          titMin.setAttribute("class", "closer");
          titMin.innerHTML = "×";
          titMin.cmp = event.target.cmp;
          titMin.onclick = function(e) {
            var q = e.target.parentNode.parentNode.querySelectorAll(".closer");
            for (var x = 0; x < q.length; x++) {
              if (q[x] === e.target) {
                var w = e.target.cmp.shadowRoot
                  .querySelector(".total")
                  .innerHTML.split("/");
                e.target.cmp.shadowRoot.querySelector(".total").innerHTML =
                  w[0] * 1 - 1 + "/" + e.target.cmp.limitImage;
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                e.target.cmp.data.splice(x, 1);
                e.target.cmp.fileName.splice(x, 1);
              }
            }
          };

          //thumbnail container
          var imgCont = document.createElement("span");
          imgCont.setAttribute("class", "card");
          imgCont.style.height = event.target.cmp.thumb_height * 1 + 10 + "px";
          imgCont.style.marginRight = "5px";
          imgCont.style.cssFloat = "left";
          imgCont.appendChild(imgMin);
          imgCont.appendChild(titMin);

          event.target.cmp.shadowRoot
            .querySelector("#cont")
            .appendChild(imgCont);

          //creating image and then a canvas
          var img = new Image();
          img.src = event.target.result;
          img.name = event.target.name;
          img.size = event.target.size;
          img.cmp = event.target.cmp;
          img.onload = function(el) {
            var elem = document.createElement("canvas");
            var scaleFactor = width / el.target.width;
            elem.width = width;
            elem.height = el.target.height * scaleFactor;

            var ctx = elem.getContext("2d");
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            var t = ctx.canvas.toDataURL(el.target, "image/jpeg", 0);
            el.target.cmp.data.push(t);
            el.target.cmp.fileName.push(el.target.name);
          };
        };
      }
    }
  }
  loadImages() {
    //clearall before load
    this.clearAll();
    var e = this.querySelectorAll("img");

    //setting a resized width
    var width = this.resize_width;

    //the total lenght of the array if we add all files
    var realLength = this.fileName.length * 1 + e.length;
    var forLength = 0;
    if (realLength <= this.limitImage) {
      //if it is valid we set the total with all files
      forLength = e.length;
    } else {
      //if it is not valid we set the total with -1 (add none)
      forLength = -1;
    }
    //if it is the firt time adding
    if (this.fileName.length == 0) {
      //if it's greater than the limit we take only the allowed length
      if (realLength > this.limitImage)
        forLength = e.length - (e.length - this.limitImage);
    }

    //the files
    for (var i = 0; i < forLength; i++) {
      this.shadowRoot.querySelector(".loading").style.display = "block";

      //creating the thumbnail
      var imgMin = document.createElement("img");
      imgMin.style.width = "auto";
      imgMin.style.height = this.thumb_height + "px";
      imgMin.src = e[i].src;
      imgMin.totalToLoad = forLength;
      imgMin.cmp = this;
      imgMin.onload = function(e) {
        var w = e.target.cmp.shadowRoot
          .querySelector(".total")
          .innerHTML.split("/");
        e.target.cmp.shadowRoot.querySelector(".total").innerHTML =
          w[0] * 1 + 1 + "/" + e.target.cmp.limitImage;
        e.target.cmp.totalLoaded++;
        if (e.target.cmp.totalLoaded == e.target.totalToLoad) {
          e.target.cmp.shadowRoot.querySelector(".loading").style.display =
            "none";
          e.target.cmp.totalLoaded = 0;
        }
      };

      //the close button
      var titMin = document.createElement("span");
      titMin.setAttribute("class", "closer");
      titMin.setAttribute("data-old", "true");
      titMin.innerHTML = "×";
      titMin.cmp = this;
      titMin.onclick = function(e) {
        var q = e.target.parentNode.parentNode.querySelectorAll(".closer");
        for (var x = 0; x < q.length; x++) {
          if (q[x] === e.target) {
            var w = e.target.cmp.shadowRoot
              .querySelector(".total")
              .innerHTML.split("/");
            e.target.cmp.shadowRoot.querySelector(".total").innerHTML =
              w[0] * 1 - 1 + "/" + e.target.cmp.limitImage;
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            e.target.cmp.data.splice(x, 1);
            e.target.cmp.fileName.splice(x, 1);
            e.target.cmp.deletedSrc.push(
              e.target.previousSibling
                .getAttribute("src")
                .split("/")
                .pop()
            );
          }
        }
      };

      //creating the thumbnail container
      var imgCont = document.createElement("span");
      imgCont.setAttribute("class", "card");
      imgCont.style.height = this.thumb_height * 1 + 10 + "px";
      imgCont.style.marginRight = "5px";
      imgCont.style.cssFloat = "left";
      imgCont.appendChild(imgMin);
      imgCont.appendChild(titMin);

      this.shadowRoot.querySelector("#cont").appendChild(imgCont);

      //creating a image anf canvas
      var img = new Image();
      img.src = e[i].getAttribute("src");
      img.name = e[i].src.split("/").pop();
      img.cmp = this;
      img.onload = function(el) {
        var elem = document.createElement("canvas");
        var scaleFactor = width / el.target.width;
        elem.width = width;
        elem.height = el.target.height * scaleFactor;

        var ctx = elem.getContext("2d");
        ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
        var t = ctx.canvas.toDataURL(el.target, "image/jpeg", 0);
        el.target.cmp.data.push("null");
        el.target.cmp.fileName.push("null");
      };
    }
  }
  deleteAll() {
    this.data = [];
    this.fileName = [];
    this.deletedSrc = [];
    this.totalLoaded = 0;
    this.shadowRoot.querySelector(".total").innerHTML = "";
    var q = this.shadowRoot
      .querySelector("#cont")
      .querySelectorAll('[data-old="true"]');
    for (var x = 0; x < q.length; x++) {
      this.deletedSrc.push(
        q[x].previousSibling
          .getAttribute("src")
          .split("/")
          .pop()
      );
    }
    this.shadowRoot.querySelector("#cont").innerHTML = "";
  }
  clearAll() {
    this.data = [];
    this.fileName = [];
    this.deletedSrc = [];
    this.totalLoaded = 0;
    this.shadowRoot.querySelector(".total").innerHTML = "";
    this.shadowRoot.querySelector("#cont").innerHTML = "";
  }
  allowDrop(ev, changeColor) {
    ev.preventDefault();
    if (changeColor == true)
      this.shadowRoot.querySelector(".component").style.border =
        "2px dashed #09d409";
    else
      this.shadowRoot.querySelector(".component").style.border =
        "2px dashed #c9c2c2";
  }
  drop(ev) {
    ev.preventDefault();
    this.shadowRoot.querySelector(".component").style.border =
      "2px dashed #c9c2c2";
    this.process(ev, true);
  }
  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
      *{font-family: var(--title-font);}
        .closer{
          position:relative;
          background-color:black;
          padding: 2px 6px;
          box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19);
          cursor:pointer;
          font-size: 13px;
          font-weight: 700;
          color:white;
          float: right;
          margin-left: -23px;
          display:none;
          font-family: var(--title-font);
               }
        .btnSel{
          border: none;
          display: inline-block;
          padding: 8px 16px;
          vertical-align: middle;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          background-color: inherit;
          text-align: center;
          cursor: pointer;
          white-space: nowrap;
          color: var(--text-body-color) !important;
          background-color: var(--main-color) !important;
          border-radius: 4px;
          margin-top:5px;
          margin-left:5px;
        }
        .btnClear{
          border: 1px solid #e1e1e1;
          background-color: white !important;
          color: gray !important;
        }
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .component{
          padding:5px;
          border:2px dashed #c9c2c2;
          text-align:center;
          overflow-y:auto;
        }
        #cont{
          margin-top: 15px;
          margin-left: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card{
          width: 100% !important;
          display: block;
        }
        .card img{
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
        }
        .card:hover span{
          display:block;
        }
        .total{
          color:gray;
          margin-top:10px;
          margin-bottom:10px;
        }
        .loading {
          position: relative;
          margin-top:-10px;
        }
        .loading-bar {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          margin: 2px;
          animation: loading 0.6s ease-in-out infinite;
        }
        .loading-bar:nth-child(1) {
          background-color: #3498db;
          animation-delay: 0;
        }
        .loading-bar:nth-child(2) {
          background-color: #c0392b;
          animation-delay: 0.09s;
        }
        .loading-bar:nth-child(3) {
          background-color: #f1c40f;
          animation-delay: .18s;
        }
        .loading-bar:nth-child(4) {
          background-color: #27ae60;
          animation-delay: .27s;
        }
        @keyframes loading {
          0% {
            transform: scale(1);
          }
          20% {
            transform: scale(1.5);
          }
          40% {
            transform: scale(1);
          }
        }
      </style>
      <div class='component'>
        <div class='total'></div>
        <div id='loading' class="loading" style='display:none;'>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      <div style='color:gray;margin-bottom:10px;'>
          <slot name='label'>Selecciona o arrastra la imagen</slot>
      </div>
      <label id='btnSelect' class='btnSel' for='selectFile'>
        <slot name='btnSelect'>Seleccionar imágen</slot>
      </label>
      <label id='btnDelete' class='btnSel btnClear'>
        <slot name='btnDelete'>Borrar</slot>
      </label>

      <input style='display:none;' type="file" name='upload' id='selectFile' multiple>

      <div id='cont'></div>
      </div>`;

    //setting attributes and events
    if (this.btnSelectText)
      shadowRoot.querySelector("#btnSelect").innerHTML = this.getAttribute(
        "btnSelectText"
      );

    if (this.btnDeleteText)
      shadowRoot.querySelector("#btnDelete").innerHTML = this.getAttribute(
        "btnDeleteText"
      );

    if (this.thumbHeight) this.thumb_height = this.getAttribute("thumbHeight");

    shadowRoot.querySelector("input").addEventListener("change", e => {
      this.process(e, false);
    });
    shadowRoot.querySelector("#btnDelete").addEventListener("click", e => {
      this.deleteAll();
    });
    shadowRoot.addEventListener("drop", e => {
      this.drop(e);
    });
    shadowRoot.addEventListener("dragover", e => {
      this.allowDrop(e, true);
    });
    shadowRoot.addEventListener("dragleave", e => {
      this.allowDrop(e, false);
    });
  }
}
window.customElements.define("uploader-lab", uploaderLab);
