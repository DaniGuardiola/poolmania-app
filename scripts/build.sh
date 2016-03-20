rm -rf build/

cp -R source/ build/

# paper-flex-layout FIX
rm build/bower_components/iron-flex-layout/classes/iron-flex-layout.html
rm build/bower_components/iron-flex-layout/classes/iron-shadow-flex-layout.html
touch build/bower_components/iron-flex-layout/classes/iron-flex-layout.html
touch build/bower_components/iron-flex-layout/classes/iron-shadow-flex-layout.html

vulcanize build/index.html --inline-script | crisper --html build/index.html --js build/js/build.js

rm -rf build/css/
rm build/imports.html
rm build/bower.json

vulcanize build/map.html --inline-script | crisper --html build/map.html --js build/js/map.js

cd build/js/
find . -type f -not -name 'background.js' -not -name 'build.js' -not -name 'map.js' | xargs rm
cd ../../

rm -rf build/bower_components/

nodejs scripts/replace.js

google-chrome --load-and-launch-app=$(pwd)/build

rm -rf mobile/www/
cp -R build/ mobile/
mv mobile/build/ mobile/www/

cd mobile/
cca run android --device