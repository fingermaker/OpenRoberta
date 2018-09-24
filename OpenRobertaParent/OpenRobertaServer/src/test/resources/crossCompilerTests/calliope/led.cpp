#define _GNU_SOURCE

#include "MicroBit.h" 
#include "NepoDefs.h" 
#include <array>
#include <stdlib.h>
MicroBit uBit;

int initTime = uBit.systemTime(); 

int main() 
{
    uBit.init();
    
    uBit.rgb.setColour(MicroBitColor(255, 0, 0, 255));
    bool absOk = (abs(3)==3) && (abs(-3)==3) && (abs(3.14)==3.14) && (abs(-3.14)==3.14);
    bool wholeOk = (isWhole(3)) && (isWhole(-3)) && (!isWhole(3.14)) && (!isWhole(-3.14));
    bool primeOk = (!isPrime(1)) && (isPrime(2)) && (isPrime(7)) && (!isPrime(15)) && (!isPrime(-3)) && (!isPrime(3.14)) && (!isPrime(32));
    if (absOk && wholeOk && primeOk) {
        uBit.rgb.setColour(MicroBitColor(0, 153, 0, 255));        
    }
    uBit.sleep(1000);
    release_fiber();
}
