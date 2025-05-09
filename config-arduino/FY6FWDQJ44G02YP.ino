#include "secrets.h"
#include <Servo.h>
#include "ThingSpeak.h"
#include <ESP8266WiFi.h>
const char ssid[] = SECRET_SSID;  // your network SSID (name)
const char pass[] = SECRET_PASS;   // your network password         
WiFiClient  client;

//---------Channel Details---------//

unsigned long counterChannelNumber =   SECRET_CHANNEL_ID1;         // Channel ID
const char * myCounterReadAPIKey = SECRET_API_KEY1; // Read API Key
const int Door = 1;  // The field you wish to read

//---------Channe2 Details---------//

unsigned long counterChannelNumber2 = SECRET_CHANNEL_ID2;            // Channel ID
const char * myCounterReadAPIKey2 = SECRET_API_KEY2; // Read API Key
const int CargoBox = 1;  // The field you wish to read

//-------------------------------//

Servo servo;

void setup() {
  pinMode(13,OUTPUT);  //For LED
  
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);
  
  servo.attach(2);  //D4
  servo.write(0);
  delay(2000);

}

void loop() {
  
  //----------------- Network -----------------//
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.println(" ....");
    while (WiFi.status() != WL_CONNECTED)
    {
      WiFi.begin(ssid, pass);
      delay(5000);
    }
    Serial.println("Connected to Wi-Fi Succesfully.");
  }
  
  //--------- End of Network connection--------//

  //---------------- Field 1 ----------------//
 
  int doorState = ThingSpeak.readLongField(counterChannelNumber, Door, myCounterReadAPIKey);
    Serial.print("Door state (value): ");
    Serial.println(doorState);
    delay(100);
    digitalWrite(13, doorState); //For LED
   
    doorState= doorState==0 ? 0:180;
    servo.write(doorState);

   //---------------- Field 2 ----------------//
  
  int cargoBoxState = ThingSpeak.readLongField(counterChannelNumber2, CargoBox, myCounterReadAPIKey2);
    Serial.print("cargo Box state (value): ");
    Serial.println(cargoBoxState);
    delay(100);
    cargoBoxState= cargoBoxState==0 ? 0:180;
    servo.write(cargoBoxState);
  
  
}
