import { Native } from "./nativeInterface";
import * as S from "./state";
import * as C from "./constants";
import * as U from "./util";
import * as WEDO from "./wedo.model";
import * as WEBVIEW_C from "./webview.controller";

export class NativeWedo implements Native {

    private timers;

    constructor() {
        this.timers = {};
        this.timers['start'] = Date.now();
    }

    public clearDisplay() {
        U.p( 'clear display' );
        WEBVIEW_C.jsToDisplay( { "clear": true } );
    }

    public getSample( name: string, port: number, sensor: string, slot: string ) {
        var robotText = 'robot: ' + name + ', port: ' + port;
        U.p( robotText + ' getsample from ' + sensor );
        var sensorName;
        switch ( sensor ) {
            case "infrared":
                sensorName = "motionsensor";
                break;
            case "gyro":
                sensorName = "tiltsensor";
                break;
            case "buttons":
                sensorName = "button";
                break;
            case C.TIMER:
                S.push( this.timerGet( port ) );
                return;
            default:
                throw 'invalid get sample for ' + name + ' - ' + port + ' - ' + sensor + ' - ' + slot;
        }
        var brickid = WEDO.getBrickIdByName( name );
        S.push( WEDO.getSensorValue( brickid, sensorName, port, slot ) );
    }

    public timerReset( port: number ) {
        this.timers[port] = Date.now();
        U.p( 'timerReset for ' + port );
    }

    public timerGet( port: number ) {
        const now = Date.now();
        var startTime = this.timers[port];
        if ( startTime === undefined ) {
            startTime = this.timers['start'];
        }
        const delta = now - startTime;
        U.p( 'timerGet for ' + port + ' returned ' + delta );
        return delta;
    }

    public ledOnAction( name: string, port: number, color: number ) {
        var brickid = WEDO.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', port: ' + port;
        U.p( robotText + ' led on color ' + color );
        const cmd = { 'target': 'wedo', 'type': 'command', 'actuator': 'light', 'brickid': brickid, 'color': color };
        WEBVIEW_C.jsToAppInterface( cmd );
    }

    public statusLightOffAction( name: string, port: number ) {
        var brickid = WEDO.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', port: ' + port;
        U.p( robotText + ' led off' );
        const cmd = { 'target': 'wedo', 'type': 'command', 'actuator': 'light', 'brickid': brickid, 'color': 0 };
        WEBVIEW_C.jsToAppInterface( cmd );
    }

    public toneAction( name: string, frequency: number, duration: number ) {
        var brickid = WEDO.getBrickIdByName( name ); // TODO: better style
        const robotText = 'robot: ' + name;
        U.p( robotText + ' piezo: ' + ', frequency: ' + frequency + ', duration: ' + duration );
        const cmd = { 'target': 'wedo', 'type': 'command', 'actuator': 'piezo', 'brickid': brickid, 'frequency': frequency, 'duration': duration };
        WEBVIEW_C.jsToAppInterface( cmd );
    }

    public motorOnAction( name: string, port: number, duration: number, speed: number ) {
        var brickid = WEDO.getBrickIdByName( name ); // TODO: better style
        const robotText = 'robot: ' + name + ', port: ' + port;
        const durText = duration === -1 ? ' w.o. duration' : ( ' for ' + duration + ' msec' );
        U.p( robotText + ' motor speed ' + speed + durText );
        const cmd = { 'target': 'wedo', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'on', 'id': port, 'direction': speed < 0 ? 1 : 0, 'power': Math.abs( speed ) };
        WEBVIEW_C.jsToAppInterface( cmd );
    }

    public motorStopAction( name: string, port: number ) {
        var brickid = WEDO.getBrickIdByName( name ); // TODO: better style
        const robotText = 'robot: ' + name + ', port: ' + port;
        U.p( robotText + ' motor stop' );
        const cmd = { 'target': 'wedo', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'stop', 'id': port };
        WEBVIEW_C.jsToAppInterface( cmd );
    }

    public showTextAction( text: any ) {
        const showText = "" + text;
        U.p( '***** show "' + showText + '" *****' );
        WEBVIEW_C.jsToDisplay( { "show": text } );
    }

    public close() {
        var ids = WEDO.getConnectedBricks();
        for ( let id in ids ) {
            if ( ids.hasOwnProperty( id ) ) {
                var name = WEDO.getBrickById( ids[id] ).brickname;
                this.motorStopAction( name, 1 );
                this.motorStopAction( name, 2 );
                this.ledOnAction( name, 99, 3 );
            }
        }
    }
}
