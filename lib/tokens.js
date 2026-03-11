const generarToken = () => Date.now().toString(36) + Math.random().toString(36).substring (2) + "BSmt-26";
export{generarToken}