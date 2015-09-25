/*if (top != self) top.location.href = location.href;*/

function go_home(url) {
    location.href = url;
}

// expires any cookie name sent as a text parameter
function erase_cookie(cname) {
    document.cookie = cname + '=empty; expires=Fri, 27 Jul 2001 02:47:11 UTC; path=/';
}

function setup_page()
{
    if (self.enable_lt) {
	document.images['tokenimg'].src = '/app/bps/token?' + Math.random();
	setTimeout("setup_fields()",250);
    } else {
	setup_fields();
    }
}

function setup_fields()
{
    var df = document.forms[0];
    if (df.LOGINID) df.LOGINID.value = '';
    if (df.PASSWORD) df.PASSWORD.value = '';
    if (df._T) df._T.value = '';
    if (df.checkboxLow) df.checkboxLow.checked = false;
    SetFocus();
}

function SetFocus() {
    var df = document.forms[0];
    if (df.LOGINID) {
	if (self.enable_lt && df._T && df.LOGINID.value.length > 0) {
	    df._T.focus();
	} else {
	    df.LOGINID.focus();
	}
    } else if (df.PASSWORD) {
	df.PASSWORD.focus();
    }
}

function build_alert(title,txt) {
    set_tip('validation','<table cellpadding="10" cellspacing="0"><tr bgcolor="#ed1c24"><td style="font-size: 8pt;color: #ffffff"><b>'+title+'</b></td></tr><tr><td style="font-size: 8pt;">&nbsp;<br>'+txt+'<br><br><br><center><input style="width: 100px; cursor: pointer; cursor: hand;" type="button" name="OK" value="OK" onClick="close_tip();SetFocus();"></center><br><br></td></tr></table>','','center');
    setTimeout('document.forms[0].OK.focus();',300);
}

function prepared()
{
    var df = document.forms[0];
    if (cookie_failed()) {
        setup_fields();
        alert_win('/bps/html/turn_on_cookies.html',325,550);
        return false;
    } else if ((df.LOGINID && df.LOGINID.value.length < 1)) {
	if (document.LOGIN && df.APPLICATION_TYPE.value != 'irb') {
	    build_alert('Enter User Name!','Please Enter your User Name to Sign On.');
	} else {
	    alert('Please Enter your User Name to Login.                    ');
	    SetFocus();
	}
	return false;
    } else if (self.enable_lt && df._T && (df._T.value.length < 5)) {
	if (document.LOGIN && df.APPLICATION_TYPE.value != 'irb') {
	    build_alert('Enter All Verification Characters!','Please Enter All 5 Verification Characters to Sign On.');
	} else {
	    alert('Please Enter All 5 Verification Characters to Login.    ');
	    SetFocus();
	}
        return false;
    } else {
	var token_info;
	if (self.enable_lt) {
	    token_info = parse_cookie('token');
	    if (token_info['_ST']) {
		df._ST.value = token_info['_ST'];
	    }
	}
	if (self.enable_lh) {
	    if (self.enable_lt) {
		if (token_info['_K']) {
		    df._K.value = token_info['_K'];
		}
		if (token_info['_SK']) {
		    df._SK.value = token_info['_SK'];
		}
	    }
	}
        return true;
    }
}

function prepared_pwd()
{
    var df = document.forms[0];
    if (df.PASSWORD.value.length < 1) {
	if (document.LOGIN && df.APPLICATION_TYPE.value != 'irb') {
	    build_alert('Enter Password!','Please Enter your Password to Sign On.');
	} else {
	    alert('Please Enter your Password to Login.');
	    df.PASSWORD.focus();
	}
	return false;
    } 
    if (self.enable_lh) {
       var pass_wd_orig = df.PASSWORD.value;
       df.BASEP.value = pass_wd_orig;
       df.PASSWORD.value = hex_md5(hex_md5(df.PASSWORD.value.toUpperCase()) + df._K.value);
       if (df.PASSWORD_UL) {
           df.PASSWORD_UL.value = hex_md5(hex_md5(pass_wd_orig) + df._K.value);
       }
    }
    return true;
}

function check_pwd()
{
    var df = document.forms[0];
    if (df._T.value.match(/\D+/)) {
	if (document.LOGIN && df.APPLICATION_TYPE.value != 'irb') {
	    build_alert('Please Note!','This is not the password field!  Please enter the verification characters.');
	} else {
	    alert('Please Note:\n\nThis is not the password field!  Please enter the verification characters.          ');
	}
	df._T.value='';
    }
}

function parse_cookie(CookieName)
{
    var CookieString = document.cookie;
    var CookieSet = CookieString.split (';');
    var SetSize = CookieSet.length;
    var CookiePieces;
    var ReturnValue = "";
    var x = 0;

    for (x = 0; (x < SetSize); x++) {
        CookiePieces = CookieSet[x].split ('=');
	if (CookiePieces[0].substring (0,1) == ' ') {
	    CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
	}
        if ((CookiePieces[0]) == (CookieName)) {
            ReturnValue = unescape(CookiePieces[1]);
        }
    }
    var cookie_values =  parse_key_values(ReturnValue,'|');
    return cookie_values;
}

function parse_key_values(delim_string,delim)
{
    var arr = new Array();
    var record_index = new Array();
    arr = delim_string.split(delim);
    for (var i=0; i < arr.length; i+=2) {
        record_index[arr[i]] = arr[i+1];
    }
    return record_index;
}

function cookie_failed() {
    var tmpdate = new Date();
    var chkcookie = (tmpdate.getTime() + '');
    document.cookie = "chkcookie=" + chkcookie + "; path=/; secure";
    if (document.cookie.indexOf(chkcookie,0) < 0) {
	erase_cookie('chkcookie');
	return true;
    } else {
	erase_cookie('chkcookie');
	return false;
    }
}

function alert_win(page,wh,ww) {
    if (!wh) var wh = 325;
    if (!ww) var ww = 350;
    var winleft = (screen.width - ww) / 2;
    var wintop = ((screen.height - wh) / 2) - 60;
    var winproperties = 'height='+wh+',width='+ww+',top='+wintop+',left='+winleft+',scrollbars=1,resizable=1';
    alertwin = window.open(page,'ALERTWIN',winproperties);
}

// popup window for search report
function sound_win() {
   var df = document.forms[0];
   var width = 350;
   var height = 250;
   var wintop;
   if (df.ACTION_SOUND) {
      var page = df.ACTION_SOUND.value;
   	if (self.enable_lt) {
         token_info = parse_cookie('token');
         if (token_info['_ST']) {
            page += "?_ST="+token_info['_ST'];
         }
   	}
   
      // set window parameters
      var sh = (screen.height);
      var sw = (screen.width);
   
      var wh = 540;
      wintop = ((sh - wh) / 2) - 60;
   
      var ww = 700;
      var winleft = (sw - ww) / 2;
   
      ww = width;
      var winleft = (sw - ww) / 2;
      wh = height;
   
      var winproperties = 'height='+wh+',width='+ww+',top='+wintop+',left='+winleft+',resizable=0,scrollbars=0,status=0,menubar=0,toolbar=0';
      var SoundWin = window.open(page,'SoundWindow',winproperties);
      if(window.focus) {
   		SoundWin.focus();
   	}
   }
}

function prepared_prud()
{
    var df = document.forms[0];
    if (cookie_failed()) {
        setup_fields();
        alert_win('/bps/html/turn_on_cookies.html',325,550);
        return false;
    } else if ((df.id2.value.length < 1) || (df.id1 && df.id1.value.length < 1)) {
	if (df.id1) {
	    alert('Please Enter a User Name and Password to Login.          ');
	    SetFocus();
	} else {
	    alert('Please Enter your Password to Login.                    ');
	    SetFocus();
	}
        return false;
    }
    return true;
}

function write_url() {
    var url;
    if (app_type == 'xbps') {
	url = 'https://riskinvestigations.lexisnexis.com';
    } else if (app_type == 'fcol') {
        url = 'https://collectionsolutions.lexisnexis.com';
    } else {
	url = 'http://www.accurint.com';
    }
    document.write(url);
}

function write_secure_url() {
    var url;
    if (app_type == 'xbps') {
	url = 'https://riskinvestigations.lexisnexis.com';
    } else if (app_type == 'fcol') {
        url = 'https://collectionsolutions.lexisnexis.com';
    } else {
	url = 'https://secure.accurint.com';
    }
    document.write(url);
}

// Returns mouse Coordinates.  Use var = mouse_pos(event,'x') for x coord / y for y coord of mouse.
function mouse_pos(e,xy) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY)     {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY)  {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    if (xy == 'x') {
        return posx;
    } else if (xy == 'y') {
        return posy;
    } else {
        alert('Must pass either \'x\' or \'y\' to received mouse coordinates.');
        return 0;
    }
}

var div_name = '';
function set_tip(dname,txt,e,position) {
    // if (div_name != '') close_tip(div_name);
    div_name = dname;
    $(div_name).style.display = 'inline';
    if (txt) $(div_name).innerHTML = txt;
    if (position == 'relative') {
        $(div_name).style.left = (mouse_pos(e,'x') - $(div_name).offsetWidth/2) + "px";
        $(div_name).style.top = (mouse_pos(e,'y')+10) + "px";
    } else if (position == 'center') {
        $(div_name).style.left = ((document.body.clientWidth/2) - $(div_name).offsetWidth/2) + "px";
        $(div_name).style.top = (((document.body.clientHeight/2) - $(div_name).offsetHeight/2) + posTop()) + "px";
    }
    $(wrapperoverlay).style.display = 'inline';
    $(wrapperoverlay).style.height = document.body.scrollHeight + 'px';
    $(wrapperoverlay).setStyle({opacity: 0.8});
}

function posTop() {
    return typeof window.pageYOffset != 'undefined' ?  window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

function close_tip(dname) {
    if (dname) div_name = dname;
    $(div_name).style.display = 'none';
    if (div_name == 'validation') {
	$(wrapperoverlay).style.display = 'none';
    } else {
	fadeOut('wrapperoverlay',80);
    }
}

function setOpacity(eID, opacityLevel) {
    $(eID).style.opacity = opacityLevel / 100;
    $(eID).style.filter = 'alpha(opacity='+opacityLevel+')';
}

function fadeOut(eID,op) {
    var timer = 0;
    for (var i=op; i>=1; i--) {
	setTimeout("setOpacity('"+eID+"',"+i+")", timer * 3);
	timer++;
    }
    setTimeout("$('"+eID+"').style.display='none'", 310);
}

// Checks for escape key and closes tip layer if depressed.
if (!document.layers) {
    document.onkeyup = doClear;
} else {
    document.captureEvents(Event.KEYPRESS);
    document.onkeypress = doClear;
}

function doClear(e) {
    var typedkey = (document.all) ? event.keyCode : e.which;
    if (typedkey == 27) {
	if (div_name != 'validation') {
	    close_tip();
	}
    }
}

