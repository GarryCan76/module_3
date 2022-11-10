const params = new URLSearchParams(window.location.search)
var v_name = params.get('v_naam')
var i_name = params.get('t_naam')
var l_name = params.get('a_naam')

document.getElementById('v_name').innerHTML = '' + v_name + '';
document.getElementById('i_name').innerHTML = '' + i_name + '';
document.getElementById('l_name').innerHTML = '' + l_name + '';