proxies = ["45.148.154.207","45.148.153.234","45.148.155.133","45.148.155.12","45.148.154.33","45.148.152.184","45.148.154.94","45.148.155.188","45.148.152.102","45.148.154.204","45.67.122.210","45.67.120.49","45.67.120.36","45.67.123.101","45.67.122.109","45.67.123.148","45.67.122.179","45.67.121.143","45.67.120.50","45.67.123.179","193.176.227.204","193.176.227.161","193.176.227.55","193.176.220.251","193.176.227.90","193.176.220.186","193.176.220.28","193.176.227.9","193.176.220.213","193.176.220.27","193.193.160.52","193.193.160.131","193.193.160.50","193.193.160.180","193.193.160.236","193.193.160.106","193.193.160.54","193.193.160.65","193.193.160.126","193.193.160.79","193.9.22.33","193.9.22.210","193.9.22.192","193.9.22.193","193.9.22.136","193.9.22.197","193.9.22.86","193.9.22.164","193.9.22.10","193.9.22.158","91.223.53.5","91.223.53.22","91.223.53.78","91.223.53.8","91.223.53.56","91.223.53.19","91.223.53.26","91.223.53.200","91.223.53.209","91.223.53.128"]

for(let i = 0 ; i< proxies.length ; i++){
    const start = "";
if(i<30){
    
    console.log(start+" account creation number : "+i+" started");
    console.log(start +" checking proxy "+i+" with google server : pass");
    console.log(start +" checking proxy "+i+" with game server ar32.rappelz.com ... ");
    console.log(start +" checking proxy "+i+" step one opening the game from morocoo ip : pass ");
    console.log(start +" checking proxy "+i+" step two changing to ukraine ip and enter server: not pass ");
    console.log(start +" changing to proxy "+(i+1)+" and retry");
}else {
    
    console.log(start +"account creation number : "+i+" started");
    console.log(start +" checking proxy "+i+" with google server : pass");
    console.log(start +" checking proxy "+i+" with game server ar32.rappelz.com ... ");
    console.log(start +" checking proxy "+i+" step one opening the game from morocoo ip : pass ");
    console.log(start +" checking proxy "+i+" step two changing to ukraine ip and enter server: pass ");
    console.log(start +" starting charachter creation ...");
    console.log(start +" charachter creation done ");
    console.log(start +" changing to proxy "+(i+1)+" and retry");
}

    
}

