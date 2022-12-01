window.onload = function () {

    document.getElementById('start').onclick = function (e) {
        Game.init()
        e.currentTarget.style.display = 'none'
        document.getElementById('canvas').style.display = 'block'
    }
    
}