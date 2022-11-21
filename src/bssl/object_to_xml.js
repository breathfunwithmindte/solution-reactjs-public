export default function OBJtoXML (obj) {
  if(!obj) return "";
  var xml = '';
  for (var prop in obj) {
      xml += "<" + prop + ">";
      if(Array.isArray(obj[prop])) {
          for (var array of obj[prop]) {

              // A real botch fix here
              xml += "</" + prop + ">\n";
              xml += "<" + prop + ">\n";

              xml += OBJtoXML(new Object(array));
          }
      } else if (typeof obj[prop] == "object") {
          xml += OBJtoXML(new Object(obj[prop]));
      } else {
          xml += obj[prop];
      }
      xml += "</" + prop + ">\n";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g,'');
  return xml
}