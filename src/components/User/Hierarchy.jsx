

import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";

const Hierarchy = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = transformUserDataToTreeData(data);
        setTreeData(transformedData);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const transformUserDataToTreeData = (userData) => {
    const designationMap = new Map();
    const designationTitles = {
      "1": "CEO",
      "2": "HR",
      "2": "SM",
      "3": "RM",
      "3": "M",
      "4": "D",
      "4": "T",
    };
  
    userData.forEach((user) => {
      const { designation, fullName } = user;
      if (!designationMap.has(designation)) {
        designationMap.set(designation, []);
      }
      designationMap.get(designation).push({ title: fullName, key: user.id });
    });

    const treeData = [];
    Array.from(designationMap.keys()).forEach((designation) => {
      const designationNode = {
        title: designationTitles[designation],
        key: designation,
        children: designationMap.get(designation),
      };
      treeData.push(designationNode);
    });
  
    return treeData;
  };
  
  
   

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};

export default Hierarchy;