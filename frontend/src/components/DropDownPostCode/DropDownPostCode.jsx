import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import baaniaService from "../../services/baaniaServices";
import "./DropDownPostCode.css";

const DropDownPostCode = () => {
  const [setshow, setSetshow] = useState(false);
  const [showValue, setShowValue] = useState();
  const [postCode, setPostCode] = useState();

  const handleChange = async (event) => {
    let id = event.target.value;
    await baaniaService.getPostCodeValue(id).then((res) => {
      setShowValue(res.data.payload);
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setSetshow(!setshow);
    })
  };

  const fetchPostCode = async () => {
    await baaniaService
      .getPostCode()
      .then((res) => {
        console.log(res.data.payload);
        setPostCode(
          res.data.payload.map((item) => {
            return {
              ...item,
              post_code: item.post_code,
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => {
        console.log(postCode);
      });
  };

  useEffect(() => {
    fetchPostCode();
  }, []);

  return (
    <div>
      <Box sx={{ minWidth: 50 }}>
        <FormControl style={{ width: 600 }}>
          <InputLabel id="post-code">SELECT POST CODE</InputLabel>
          <Select
            labelId="post-code"
            id="post-code-select"
            value={postCode}
            label="SELECT POST CODE"
            onChange={handleChange}
          >
            {postCode && postCode.map((item) => <MenuItem value={item.post_code}>{item.post_code}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      {setshow && (
        <div>
          <p>average: {showValue.average}</p> <p>median: {showValue.median}</p>
        </div>
      )}
    </div>
  );
};

export default DropDownPostCode;
