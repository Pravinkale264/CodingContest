import { useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import axios from 'axios'
import moment from 'moment';

const { Text, Title } = Typography;

const Contest = () => {

    const [myData, setMyData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get("https://kontests.net/api/v1/all");
            setMyData(response.data);
            setLoading(false);
        };

        loadPosts();
    }, [])

    return (
        <>
            <h1 className='heading'>CODING CONTEST</h1>
            <input
                className='searchbar'
                // style={{ width: "30%", height: "25px" }}
                type="text"
                placeholder="Search Contest..."
                onChange={(e) => setSearchTitle(e.target.value)}
            />
            {/* <div className="grid"> */}
            <Row gutter={[24, 24]}>
                {
                    (myData
                        .filter((value) => {
                            if (searchTitle === "") {
                                return value;
                            } else if (value.name.toLowerCase().includes(searchTitle.toLowerCase())) {
                                return value;
                            }
                        }).map((post, i) => {
                            return (
                                <Col xs={24} sm={12} lg={8} key={i}>
                                    <a href={post.url} target='_blank' rel='noreferrer' style={{ color: "black" }}>
                                        <Card className="news-card">
                                            <div className="news-image-container">
                                                <Title className='new-title' level={3}>{(post.name)}</Title>
                                                <img
                                                    style={{ maxWidth: "75px", maxHeight: "75px" }}
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJjBNQGQQCmiYN2GM9BF_x51hbhL0HDoq_w0-QPxpcMeqmFg_OWNgfZcZd5KoCDL4Bzw&usqp=CAU"
                                                    alt="news"
                                                />
                                            </div>
                                            {/* <div style={{textAlign:"left"}}>
                    <h4>Start Time: {post.start_time}</h4>
                    </div> */}
                                            <h4 className='news-title ml-2' level={4}>Start-Time: {new Date((post.start_time)).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</h4>
                                            <h4 className='news-title ml-2' level={4}>End-Time: {new Date((post.end_time)).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</h4>
                                            <h3 className='news-title1 ml-2' level={4}>Duration: {(Math.floor(((post.duration) / 60) / 60))} Hours / {moment.utc((post.duration) * 1000).format("hh:mm:ss")}</h3>
                                            {/* <h4 className='news-title1 ml-2' level={4}>{post.status}</h4> */}
                                            {/* <h3 className='news-title1 ml-2' level={4}>Duration: {moment.utc((post.duration)*1000).format("hh:mm:ss")}</h3> */}

                                            <div className="provider-container">
                                                <div id='platform'>
                                                    <Avatar src="https://img.freepik.com/free-vector/gradient-coding-logo-template_23-2148809439.jpg?w=2000" alt='newslogo' />
                                                    <Text className='provider-name'><b>Platform: {post.site}</b></Text>
                                                </div>
                                                <div>
                                                    <b>
                                                        <Text>{moment(post.start_time).startOf('ss').fromNow()}</Text>
                                                    </b>
                                                </div>
                                            </div>
                                            <div >
                                                <button className='joinnow' type="button"><b>Join Now</b></button>
                                            </div>
                                        </Card>
                                    </a>
                                </Col>
                            )
                        })
                    )
                }
            </Row>
        </>
    )
}

export default Contest;
