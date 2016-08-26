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
