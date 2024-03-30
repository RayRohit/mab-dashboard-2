<Grid px={4} py={2} container elevation={9} alignItems={'center'}>
                    {/* Chart */}
                    <Grid item xs={12} p={1} component={Paper}>
                        {/* <Paper sx={{ p: 3 }}> */}
                        {/* <Button disabled> */}
                        <Typography fontWeight={'bold'} px={1} color={'black'}>Count Analytics</Typography>
                        {/* </Button> */}
                        <CardActions>
                            <Card sx={{ px: 2, pt: 1, width: 200 }} elevation={7}>
                                <Avatar sx={{ width: 70, height: 40, backgroundColor: "white" }}>
                                    <img src={entry} alt='entry' width={50} height={50} />
                                </Avatar>
                                <Typography fontWeight={'bold'} padding={2} fontSize={13} color={'black'}>
                                    Entry  Count: {data.length === 0 ? 0 : data.entry}
                                </Typography>
                            </Card>&emsp;
                            <Card sx={{ px: 2, pt: 1, width: 200 }} elevation={7}>
                                <Avatar sx={{ width: 70, height: 40, backgroundColor: "white" }}>
                                    <img src={exit} alt='exit' width={50} height={50} />
                                </Avatar>
                                <Typography fontWeight={'bold'} padding={2} fontSize={13} color={'black'}>
                                    Exit  Count: {data.length === 0 ? 0 : data.exit}
                                </Typography>
                            </Card>&emsp;
                            <Card sx={{ px: 2, pt: 1, width: 200 }} elevation={7}>
                                <Avatar sx={{ width: 70, height: 40, backgroundColor: "white" }}>
                                    <img src={reentry} alt='reentry' width={50} height={50} />
                                </Avatar>
                                <Typography fontWeight={'bold'} padding={2} fontSize={13} color={'black'}>
                                    Re-Entry Count: {data.length === 0 ? 0 : data.reentry}
                                </Typography>
                            </Card>
                        </CardActions>
                        {/* </Paper> */}
                    </Grid>
                    <Grid item xs={12} mb={4} mt={2} pb={2} component={Paper}>
                        {/* <Button disabled sx={{ pt: 1 }}> */}
                        <Typography fontWeight={'bold'} px={2} py color={'black'}>Camera Details</Typography>
                        {/* </Button> */}
                        <Grid container rowSpacing={2}>
                            {
                                cameras.map((camera, idx) => {
                                    return (
                                        <Grid key={idx} px={2} item xs={12} md={6} lg={4} display={'flex'} alignItems={'center'}>
                                            <MediaCard camera={camera} id={idx} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>