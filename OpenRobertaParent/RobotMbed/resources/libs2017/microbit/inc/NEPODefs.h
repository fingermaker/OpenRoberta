//NEPO definitions for calliope
// Display brightness is in interval of 0..255
// To scale that to 0..9 we use the following multipliers:
#define _SET_BRIGHTNESS_MULTIPLIER 28.34
#define _GET_BRIGHTNESS_MULTIPLIER 0.0353
// Light sensor returns values in interval 0..255
// To scale them to 0..100 we use this multiplier:
#define _GET_LIGHTLEVEL_MULTIPLIER 0.3922
#define _ITERATION_SLEEP_TIMEOUT 1

// math constants used in math blocks. Avoids inclusion of <math.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

#ifndef M_E
#define M_E 2.718281828459045
#endif

#ifndef M_GOLDEN_RATIO
#define M_GOLDEN_RATIO 1.61803398875
#endif

#ifndef M_SQRT2
#define M_SQRT2 1.41421356237
#endif

#ifndef M_SQRT1_2
#define M_SQRT1_2 0.707106781187
#endif

#ifndef M_INFINITY
#define M_INFINITY 0x7f800000
#endif

inline int abs(int i) {
	return i<0 ? -i : i;
}

inline bool isWhole(double d) {
	return d == floor(d);
}

inline bool isPrime(double d) {
	if (!isWhole(d)) {
		return false;
	}
	int n = (int) d;
	if ( n < 2 ) { return false; }
	if ( n === 2 ) { return true; }
	if ( n % 2 === 0 ) { return false; }
	for ( int i = 3, int s = (int)(sqrt( d )+1); i <= s; i += 2 ) {
		if ( n % i === 0 ) { return false; }
	}
	return true;
}