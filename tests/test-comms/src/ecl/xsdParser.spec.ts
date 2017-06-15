import { expect } from "chai";

import { parseXSD } from "@hpcc-js/comms";

describe("SAXParser", function () {
    it("basic", function () {
        const x = parseXSD(xml);
        expect(x).to.exist;
        expect(x.root).to.exist;
        expect(x.simpleTypes).to.exist;
    });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:hpcc="urn:hpccsystems:xsd:appinfo" elementFormDefault="qualified" attributeFormDefault="unqualified">
   <xs:element name="Dataset">
      <xs:complexType>
         <xs:sequence minOccurs="0" maxOccurs="unbounded">
            <xs:element name="Row">
               <xs:complexType>
                  <xs:sequence>
                     <xs:element name="personid" type="xs:nonNegativeInteger" />
                     <xs:element name="firstname" type="string15" />
                     <xs:element name="lastname" type="string25" />
                     <xs:element name="middleinitial" type="string1" />
                     <xs:element name="gender" type="string1" />
                     <xs:element name="street" type="string42" />
                     <xs:element name="city" type="string20" />
                     <xs:element name="state" type="string2" />
                     <xs:element name="zip" type="string5" />
                     <xs:element name="accounts">
                        <xs:complexType>
                           <xs:sequence minOccurs="0" maxOccurs="unbounded">
                              <xs:element name="Row">
                                 <xs:complexType>
                                    <xs:sequence>
                                       <xs:element name="account" type="string20" />
                                       <xs:element name="opendate" type="string8" />
                                       <xs:element name="industrycode" type="string2" />
                                       <xs:element name="accttype" type="string1" />
                                       <xs:element name="acctrate" type="string1" />
                                       <xs:element name="code1" type="xs:nonNegativeInteger" />
                                       <xs:element name="code2" type="xs:nonNegativeInteger" />
                                       <xs:element name="highcredit" type="xs:nonNegativeInteger" />
                                       <xs:element name="balance" type="xs:nonNegativeInteger" />
                                    </xs:sequence>
                                 </xs:complexType>
                              </xs:element>
                           </xs:sequence>
                        </xs:complexType>
                     </xs:element>
                     <xs:element name="__fileposition__" type="xs:nonNegativeInteger" />
                  </xs:sequence>
               </xs:complexType>
            </xs:element>
         </xs:sequence>
      </xs:complexType>
   </xs:element>
   <xs:simpleType name="string15">
      <xs:restriction base="xs:string">
         <xs:maxLength value="15" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string25">
      <xs:restriction base="xs:string">
         <xs:maxLength value="25" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string1">
      <xs:restriction base="xs:string">
         <xs:maxLength value="1" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string42">
      <xs:restriction base="xs:string">
         <xs:maxLength value="42" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string20">
      <xs:restriction base="xs:string">
         <xs:maxLength value="20" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string2">
      <xs:restriction base="xs:string">
         <xs:maxLength value="2" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string5">
      <xs:restriction base="xs:string">
         <xs:maxLength value="5" />
      </xs:restriction>
   </xs:simpleType>
   <xs:simpleType name="string8">
      <xs:restriction base="xs:string">
         <xs:maxLength value="8" />
      </xs:restriction>
   </xs:simpleType>
</xs:schema>`;
