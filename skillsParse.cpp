/*
* SkillsParse.cpp
* YourCorner CSV to autocomplete.js
* Author: Riley Miller
* 10/16/17
*/

#include <cstdlib>
#include <iostream>
#include <fstream>
#include <set>
#include <sstream>
#include <algorithm>

using namespace std;




/*
*  Takes in a string and uses STL all_of and ::isdigit methods
* to check string for digits, this was much easier than parsing string 
* to ints and checking potential characters existing in the complement 
* of integers
*/
bool is_digits(string str)
{
    return all_of(str.begin(), str.end(), ::isdigit); // C++11
}




/*
* This file takes the plaintext string that were broken down
* by parseToJSON and creates a JSON file.
*/
void createAutoCompleteJS(string code, string skill) {
   ofstream outfile;
   string fileName;
   outfile.open("autocomplete.js", std::ios_base::app);
   cout << "inside of createAutoCompleteJS" << endl;
   outfile << " 	\"" << skill << "\"," << endl;
   outfile.close();

   outfile.open(code + ".js",std::ios_base::app);
   cout << "inside of " << code << ".js" << endl;
   outfile << " 	\"" << skill << "\"," << endl;
   outfile.close();

}

void openFiles() {
	ofstream outfile;
	outfile.open("autocomplete.js");
	outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("I_D.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("S_D.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("P_M.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("G_D.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("B_D.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("Q_A.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("E_A.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("L_D.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();

    outfile.open("D_S.js");
    outfile << " $(function() {" << endl;
    outfile << "	var availableTags = [" << endl;
    outfile.close();
}

void closeFiles() {
	ofstream outfile;
	outfile.open("autocomplete.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#skillSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("I_D.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#I_DSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("S_D.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#S_DSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("P_M.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#P_MSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("G_D.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#G_DSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("B_D.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#B_DSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("Q_A.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#Q_ASelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("E_A.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#E_ASelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("L_D.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#L_DSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();

    outfile.open("D_S.js", std::ios_base::app);
	outfile << " 	];" << endl;
	outfile << "	$(\"#D_SSelect\").autocomplete({" << endl;
    outfile << "		source: availableTags" << endl;
    outfile << "	});" << endl;
    outfile << "  });" << endl;
    outfile.close();
}

/*
* This function parses through log and checks for malformed logs,
* missing fields, bad data, etc, and then breaks the tokens of the 
* logs down into a format that is easy for the createJSON() function
* to digest
*/
void parseToJSON(string file_name) {

	
	ifstream inFile;
	inFile.open(file_name);

	if(!inFile) {
	  cerr << "Error: Unable to open file: " << file_name << endl;
	  exit(EXIT_FAILURE);
	}


    
    openFiles();

	string line, skill, pass, code;
	bool file_made = false;
	
	getline(inFile, line);
	while(getline(inFile, line)) {
	 if(line.length() < 1){
	  break;
	 }	
	
	 istringstream token(line);
	 getline(token, code, ',');
	 getline(token, pass, ',');
	 getline(token, pass, ',');
     getline(token, skill, ',');
     cout << "Code: " << code << endl;
	 if(!skill.empty()){
	 	createAutoCompleteJS(code, skill);
	 	cout << "Appending skill: " << skill << endl;
	 } else {
	 	cout << "Blank skill not appended" << endl;
	 }
	}

	cout << "Finished appending skills to file.... Closing" << endl;
	
	closeFiles();

	inFile.close();	
}

int main(int argc, char** argv) {

	string file_flag, file_name;

	for(int i = 1; i < argc; i++) {
		if(i == 1)
		  file_flag = argv[i];
		if(i == 2)
		  file_name = argv[i];
	}
		
     if(file_flag.empty()) {
	cerr << "ERROR: must specify -f [filename]" << endl;
	exit(EXIT_FAILURE);	
     } else if(file_name.empty()) {
	cerr << "ERROR: must specify [filename]" << endl;
	exit(EXIT_FAILURE);
     } else {
	  parseToJSON(file_name);
	}
     
	

return 0;
}
