import { TextureLoader } from 'three';
import * as THREE from "three";

var loader = new TextureLoader();

export function loadTexture( path ) {
    return new Promise( ( resolve, reject ) => {
        var tx =  require(path).img
        return tx
        //var tx = THREE.ImageUtils.loadTexture(path);
        //return tx

        /*
        loader.load( path,
            //resolve,undefined,reject
            function(txtr){
                console.log(txtr)
                var coneMaterial = new THREE.MeshBasicMaterial({
                    map : txtr
                })
            },
            undefined,
            function(err){
                console.error('Oops', err)
            }
        )
        */
    });
}
export default loadTexture;