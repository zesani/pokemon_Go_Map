```html
<!DOCTYPE html>
<html>

<head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/0.9.3/vue-resource.min.js"></script>
</head>

<body>
    <div id="app">

        <button type="button" name="button" @click='getApi'>re</button>

        <div class="box">
          {{pokemon[page].name}}
          <div class="screen">
            <img id="picture" :src="pokemon[page].icon">
          </div>
          <div class="button">
            <a class="previous" @click="previous"><br>Previous</a>
            <a class="next" @click="next"><br>Next</a>
          </div>
          <div class="map">
              <div id="map"></div>
          </div>
        </div>





    </div>

</body>
<script src="./app.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAD7aVfDsori3gazo4jvoaeURiGM-X_-UU&callback=" async defer></script>
<link rel="stylesheet" href="css.css" media="screen" title="no title" charset="utf-8">

</html>

```


app.js

``` javaScript
var app = new Vue ({
  el: '#app',
  data: {
    lat: 0,
    lng: 0,
    list: [],
    pokemon: [],
    page: 0
  },
  methods: {
    getApi: function () {
      var url = 'http://www.pokesnipers.com/api/v1/pokemon.json'
      var that = this
      this.$http.get(url).then(function (res) {
        that.list = res.data.results
        console.log(that.list.length)
        for (var i = 0; i < that.list.length; i++) {
          var str = this.list[i].coords.split(',')
          var lati = parseInt(str[0])
          var lngti = parseInt(str[1])
          this.pokemon.push(that.list[i])
        }
        console.log(that.pokemon.length)
        this.showInMap()
      })

    },
    googleMap: function () {
      var myLatLng = {lat: this.lat, lng: this.lng}
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat, lng: this.lng},
        zoom: 1
      })
      //  mark จุดบนแผนที่
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
      })
    },
    showInMap: function () {
      var str = this.list[this.page].coords.split(',')
      this.lat = parseInt(str[0])
      this.lng = parseInt(str[1])
      this.googleMap()
    },
    previous: function () {
      this.page--
      this.showInMap()
    },
    next: function () {
      this.page++
      this.showInMap()
    }
  }
})

```

css.css
``` css

.box {
  position: relative;
  border-color: red;
  margin: 50px 500px auto;
  width: 400px;
  background: red;
  height: 600px;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  border-radius: 50px;
}
.screen {
  position: absolute;
  right: 50px;
  top: 50px;
  width: 300px;
  height: 300px;
  background: blue;
  border-radius: 22px;
}
.screen img {
  width: 300px;
}
.button {
  position: absolute;
  right: 50px;
  margin-top: 375px;
  width: 300px;
  height: 100px;

}
.button .next {
  position: absolute;
  right: 0;
  background: blue;
  width: 100px;
  height: 100px;
  font-size:27px;
  border-radius: 500px;
  text-align: center;
  color: white;
}
.button .previous {
  position: absolute;
  left: 0;
  background: blue;
  width: 100px;
  height: 100px;
  font-size:27px;
  border-radius: 500px;
  text-align: center;
  color: white;
}
.button a:hover {
    background: pink;
}
.map {
    display: inline-block;
    left: 400px;
    position: absolute;
    width: 400px;
    background: red;
    height: 400px;
    border-radius: 50px;
    padding-top: 50px;
    padding-left: 50px;
}
.map #map {
  width: 350px;
  height: 350px;
}

```
