import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  /* width: 360px; */
  width: ${(props) => props.type !== "sm" && "360px"};
  /* margin-bottom: 45px; */
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  //width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  /* height: 202px; */
  background-color: #999;
  border-radius: 8px;
  flex: 1;
`;

const ChannelImage = styled.img`
  display: ${(props) => props.type === "sm" && "none"};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  /* margin-top: 16px; */
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      // Fetch beim start alle videos aus dieser Schnittstelle
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };

    fetchChannel();
  }, [video.userId]);

  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
