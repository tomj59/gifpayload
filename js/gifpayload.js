// Gif PayLoad magic Object
function GifPayload( gifsrc = "giffer.php" ) {
    this.gifsrc = gifsrc;
    this.init();
}

GifPayload.prototype.init = function() {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", this.gifsrc, true);
        oReq.responseType = "arraybuffer";
        var $this=this;
        oReq.onload = function (oEvent) {
           if( oReq.status === 200 ) {
                var arrayBuffer = oReq.response; // Note: not oReq.responseText
                if (arrayBuffer && arrayBuffer.byteLength>43) {
                        var payload_arr = arrayBuffer.slice(43);
                        var payload = $this.hexa( String.fromCharCode.apply( null, new Uint8Array( payload_arr ) ) );
                        $this.process( payload );
                } else {
			$this.nopayload(oReq);
                }
           }
           else {
                console.log( "Oops, invalid GIF-beacon location" );
           }
        };
        oReq.send(null);
}

GifPayload.prototype.hexa = function(payload) {
        var hex = payload.toString(); //force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
}

GifPayload.prototype.nopayload = function( reqObj ) {
        console.log( "no payload" );
}

GifPayload.prototype.process = function(payload) {
        console.log( payload );
}

