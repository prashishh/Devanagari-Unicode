// initialize map for basic nepali characters
var nepali = {'a':'अ','aa':'आ','i':'इ','ii':'ई','u':'उ','uu':'ऊ','e':'ए','ai':'ऐ','o':'ओ','au':'औ','k':'क्','ka':'क','kh':'ख्','kha':'ख','g':'ग्','ga':'ग','gh':'घ्','gha':'घ','ch':'च्','cha':'च','chh':'छ्','chha':'छ','j':'ज्','ja':'ज','jh':'झ्','jha':'झ','t':'त्','ta':'त','tha':'थ','th':'थ्','T':'ट्','Ta':'ट','Th':'ठ्','Tha':'ठ','d':'द्','da':'द','D':'ड्','Da':'ड','Dh':'ढ्','Dha':'ढ','dh':'ध्','dha':'ध','n':'न्','na':'न','Ng':'ङ्','Nga':'ङ','N':'ण्','Na':'ण','Yn':'ञ्','Y':'य्','Ya':'य','Yna':'ञ','p':'प्','pa':'प','ph':'फ्','pha':'फ','b':'ब्','ba':'ब','bh':'भ्','bha':'भ','m':'म्','ma':'म','y':'य्','ya':'य','r':'र्','ra':'र','rr':'र्‍','l':'ल्','la':'ल','v':'व्','va':'व','sh':'श्','sha':'श','s':'स्','sa':'स','shh':'ष्','shha':'ष','h':'ह्','ha':'ह','c':'क्','ca':'क','f':'फ्','fa':'फ','q':'क्','qa':'क','w':'व्','wa':'व','x':'ज्','xa':'ज','z':'ज्','za':'ज','O':'ॐ'};

// initialize banots
var shabda_banot = { 'aa':'ा','i':'ि','ii':'ी','u':'ु','uu':'ू','e':'े','ai':'ै','o':'ो','au':'ौ'};

// separate out vowels and consonants
var vowel = { 'a':'','i':'','u':'','e':'','o':''};
var consonant = { 'b':'','c':'','d':'','D':'','f':'','g':'','h':'','j':'','k':'','l':'','m':'','n':'','N':'','p':'','q':'','r':'','s':'','t':'','T':'','Y':'','O':'','v':'','w':'','y':'','x':'','z':'' };

// numerals
var numerals = {0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:''};

// initialize special characters (add if not listed below)
var special_characters = { '`':'','~':'','!':'','@':'','#':'','$':'','%':'','&':'','(':'',')':'','-':'','_':'','=':'','+':'','{':'','}':'','[':'',']':'','\\':'','|':'',';':'',':':'','"':'','\'':'','<':'','>':'',',':'','.':'','?':'', '/':'','A':'','B':'','C':'','E':'','F':'','G':'','H':'','I':'','J':'','K':'','L':'','M':'','P':'','Q':'','R':'','S':'','U':'','V':'','W':'','X':'','Z':'' }

// map of arrays

var mystruct = { 
a : A=new Array("aa","ai","au","a"),
b : B=new Array("bh","b","ba","bha"),
c : C=new Array("chh","ch","cha","c","ca","chha"),
d : D=new Array("d","da","dh","dha"),
D : D1=new Array("D","Da","Dh","Dha"),
e : E=new Array("e"),
f : F=new Array("f","fa"),
g : G=new Array("gh","gha","g","ga"),
h : H=new Array("h","ha"),
i : I=new Array("ii","i"),
j : J=new Array("jh","jha","j","ja"),
k : K=new Array("kh","kha","k","ka"),
l : L=new Array("l","la"),
m : M=new Array("m","ma"),
n : N=new Array("n","na"), 
N : N1=new Array("N","Na","Ng","Nga"),
o : O=new Array("o"),
O : O1=new Array("O"),
p : P=new Array("ph","pha","p","pa"),
q : Q=new Array("q","qa"),    				
r : R=new Array("r","ra","rr"), 		 		
s : S=new Array("shh","shha","sh","sha","s","sa"),
t : T=new Array("th","tha","t","ta"),
T : T1=new Array("T","Ta","Th","Tha"),
u : U=new Array("uu","u"),
v : V=new Array("v","va"),
w : W=new Array("w","wa"),
x : X=new Array("x","xa"),
y : Y=new Array("y","ya"),
Y : Y1=new Array("Y","Ya","Yn","Yna"),
z : Z=new Array("zh","z","za"),
};

var flg = "";
var result = "";
var code = "";
var code_support = "";
var flag_for_shabda_banot = false;
var toggleon = false;
var word = "";

// Input character/words are passed to this function
// input(words,event)
// Eg.  onKeyUp="return input(document.getElementById('inputNepText').value, event)"

function input( val, evt )
{    	
	temp_val = val;
	
	for ( var k = 0; k < temp_val.length; k++ ) {
		
        // checks for 'English Mode'
		if ( enable_Eng( temp_val[k] ) ) continue;		// we don't need to process it
		
        // few special cases
		if ( temp_val[k] == "*" ) { 
				display("ँ");
				continue;
		}
	       
		if ( temp_val[k] == "^" ) { 
				display("ं");
				continue;
		}
		
		if ( temp_val[k] == "R" ) { 
				display("ऋ");
				continue;
		}
		
        // in the first case, calls initilize function
		if ( k == 0 ) {
			initialize( temp_val[k] );
		}
	
        // concatenate to global word varible
		word = word + temp_val[k];
		if ( exception_handling() ) continue;
			
        // special case, spacebar
		if ( temp_val[k] == "\u0020" ) {
			temp_val[k] = "\u0020";
			spacebarPressed();
			word = "";
			continue;
		}
        
        
		Unicode( temp_val[k] );
	}
	resetflags();
	if ( temp_val.length == 0 ) display("");
}

function resetflags()
{
	toggleon = false;
	result = "";
	code = "";
	code_support = "";
	flag_for_shabda_banot = false;
	word = "";
}

// initialize function
function initialize(val)
{	
	flg = mystruct[val[val.length-1]];
}

function changeinDisplay( val )
{
	if ( val.length < 2 ) return;
	result = result.substr(0,result.length-2);
}

function changeinDisplay2( val )
{

	if ( code[code.length-1] in vowel && code[code.length-2] in consonant ) {
		result = result.substr(0,result.length-1);
	}
	
	if  ( ( ( code_support[code_support.length-1] == "i" ) && ( code[code.length-2] == "i" ) ) || ( ( code_support[code_support.length-1] == "u" ) && ( code[code.length-2] == "u" ) ) ){
		result = result.substr(0,result.length-1);
	}
	
}

// special case for spacebase key
function spacebarPressed( ) 
{
	code_support = "";
	code = "";
	flag_for_shabda_banot = false;
	result = result + "\u0020";
	document.getElementById('output').value = result;
}

// output function
// change ID as required
function display( result_temp ) 
{
	result = result + result_temp;
	document.getElementById('output').value = result;
}

// core unicode mapper
function Unicode(val)
{		
	var last_letter = val[val.length-1];
			
    // checks for numerals or special chars
	if ( last_letter in numerals || last_letter in special_characters ) {
		display( last_letter );
		flg = "e";
		return;	
	}
	
	var found = false;
	code = code + last_letter;
	
    // basically checks the use of datastructure according to the position of vowel and consonant
    // eg 'aa' is आ normally but when we write 'kaa' it should be का
	if ( code_support[code_support.length-1] in vowel && last_letter in consonant ) {
	
		code_support = "";
	}

// get character + x [] combination

	if ( flag_for_shabda_banot == true ) {		
				
		if ( last_letter in vowel ) {
			code_support = code_support + last_letter;
		}
		
		if ( code_support in shabda_banot && last_letter in vowel ) {
		
				changeinDisplay2(code_support);
				display( shabda_banot[code_support] );
				
				if ( last_letter in vowel && code_support.length < 2 ) {
					flag_for_shabda_banot = true;
				}
				else {  
					flag_for_shabda_banot = false;
					code_support = "";
				}
				return;
				
		}
			
	}
	
	if ( last_letter in consonant )
	{
		flag_for_shabda_banot = true;
	}

// get character from the data structure
	for ( var i = 0; i < flg.length; i++ )
	{
			if ( flg[i] == code )  {
				found = true;	
				if ( flg[i] == "aa" || flg[i] == "ii" || flg[i] == "uu" ) {
					result = result.substr(0,result.length-1);
				}
				else changeinDisplay(code);
				display( nepali[code] );
				return;
			}
	}
	
	code = last_letter;
	flg = mystruct[code];
	display( nepali[code] );        // output in display function
}

// checks if English Mode is enabled or not.
// checks for characters between '<' and '>'
function enable_Eng( val_temp )
{
	var temp_flag = false;
	
	if ( toggleon && val_temp == '>' ) {
		toggleon = false;
		temp_flag = true;
	}

	if ( !toggleon ) {
		if ( val_temp == '<' ) {
			toggleon = true;
			temp_flag = true;
		}
	}
	else if ( toggleon ) {
		display( val_temp );
		temp_flag = true;
	}
	return temp_flag;
}

// few user defined exceptions for convinience
// add to maps if necessary
function exception_handling()
{
	var exception = { 'au':'औ','aauda' : 'आउँदा','acharya':'आचार्य','airport':'एअरपोर्ट','amrit':'अमृत','char': 'चार','chhetri':'','paanch' : 'पाँच','fortystones':'फोर्टिस्टोन्स','kathmandu' : 'काठमाडौं','kripaya':'कृपया','krishi':'कृषि','krishna' : 'कृष्ण', 'krishnaa' : 'कृष्णा', 'patan' : 'पाटन', 'tapai':'तपाईं', 'gyan' : 'ज्ञान','rajbhandari':'राजभण्डारी','roushan':'रौशन', 'shah':'शाह','shrestha':'श्रेष्ठ','unicode' : 'युनिकोड','united' : 'युनाईटेड' };
	
	temp = result.length-1;
	
	if ( word in exception ) {
		
		while ( result[temp] != "\u0020" ) {
			if ( temp == 0 ) {
				temp= -1;
				break;
			}
			temp = temp - 1;
		}	
			
		result = result.substr(0,temp+1);
		display( exception[word] );
		word = "";
		return true;
	}
	return false;
}



