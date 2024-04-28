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
    const levelMap = new Map();

    userData.forEach((user) => {
      const { designation, designationName, fullName } = user;

      if (!levelMap.has(designation)) {
        levelMap.set(designation, {
          title: `Level ${designation}`,
          key: `level-${designation}`,
          children: [],
        });
      }

      if (!designationMap.has(designationName)) {
        designationMap.set(designationName, {
          title: designationName,
          key: designationName,
          children: [],
        });
      }

      designationMap.get(designationName).children.push({
        title: fullName,
        key: user.id,
      });

      levelMap.get(designation).children.push(designationMap.get(designationName));
    });

    // return Array.from(levelMap.values());

    return Array.from(levelMap.values()).sort(
      (a, b) => a.key.split("-")[1] - b.key.split("-")[1]
    );
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