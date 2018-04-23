
#puts index.html into the deployment folder
cp index.html deployment/index.php

#puts .js files into a js/ folder
#sed -i 's/index.js/js\/index.js/g' deployment/index.php
#sed -i 's/autocomplete.js/js\/autocomplete.js/g' deployment/index.php
#sed -i 's/B_D.js/js\/B_D.js/g' deployment/index.php
#sed -i 's/D_S.js/js\/D_S.js/g' deployment/index.php
#sed -i 's/E_A.js/js\/E_A.js/g' deployment/index.php
#sed -i 's/G_D.js/js\/G_D.js/g' deployment/index.php
#sed -i 's/I_D.js/js\/I_D.js/g' deployment/index.php
#sed -i 's/L_D.js/js\/L_D.js/g' deployment/index.php
#sed -i 's/P_M.js/js\/P_M.js/g' deployment/index.php
#sed -i 's/Q_A.js/js\/Q_A.js/g' deployment/index.php
#sed -i 's/S_D.js/js\/S_D.js/g' deployment/index.php

#puts css file into a css folder
sed -i 's/index.css/css\/index.css/g' deployment/index.php

#copies index.js into deploy
cp js/index.js deployment/js/index.js
#copies js files into deployment/js folder
cp js/autocomplete.js deployment/js/autocomplete.js
cp js/B_D.js deployment/js/B_D.js
cp js/D_S.js deployment/js/D_S.js
cp js/E_A.js deployment/js/E_A.js
cp js/G_D.js deployment/js/G_D.js
cp js/I_D.js deployment/js/I_D.js
cp js/L_D.js deployment/js/L_D.js
cp js/P_M.js deployment/js/P_M.js
cp js/Q_A.js deployment/js/Q_A.js
cp js/S_D.js deployment/js/S_D.js



#copies css files into deployment zip
cp index.css deployment/css/index.css

#zips
zip -r deployment.zip deployment/
