import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../Environment";

export default function NoticeTeacher() {
  const [notices, setNotices] = useState([]);

  const filteredNotices = notices.filter(
    (notice) => notice.audience === "teacher"
  );

  useEffect(() => {
    axios
      .get(`${baseApi}/notice/all`)
      .then((res) => {
        setNotices(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <h1>Notice</h1>

      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
      ></Typography>

      {filteredNotices &&
        filteredNotices.map((item) => {
          return (
            <Paper
              key={item._id}
              sx={{
                paddingBottom: 2,
                paddingLeft: 3,
                paddingTop: 0.2,
                width: "100%",
                maxWidth: "400px", // You can change this to 300px or 350px if you want narrower cards
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Typography variant="h5">
                  <strong>Notice: </strong> {item.title}
                </Typography>
                <Typography variant="h5">
                  <strong>Message: </strong> {item.message}
                </Typography>
                <Typography variant="h5">
                  <strong>Audience: </strong> {item.audience}
                </Typography>
              </Box>
            </Paper>
          );
        })}
    </div>
  );
}
