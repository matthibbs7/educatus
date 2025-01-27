import { Box, Button, Flex, Input, Text, Textarea, Tooltip } from '@chakra-ui/react'
import type { NextPage } from 'next'
import router from 'next/router';
import React, { Component, useState } from 'react';
import { SiMoleculer } from 'react-icons/si'
import { constSelector } from 'recoil';

const HOST_PREFIX = process.env.HOST_PREFIX ?? 'http://localhost:8080'

const TextAnalyzer: NextPage = () => {
    const [analyzedForm, setAnalyzedForm] = useState({
        text: "",
      });
    
    const [loading, setLoading] = useState(false)
    const [analyzedText, setAnalyzedText] = useState<Array<any>>([])
    
    
    const getAnalyzed = async (text: string) => {
        const request = await fetch(`${HOST_PREFIX}/ner`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                'text': analyzedForm.text,
            })
        })
        const data = await request.json()

        return data
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();

        console.log(analyzedForm.text);
        
        getAnalyzed(analyzedForm.text).then(response => {
            let out: any[] = [];
            console.log(response.entities)
            for (let i = 0; i < response.entities.length; i++) {
                if (response.entities[i].startsWith('[') && response.entities[i].endsWith(']')) {
                    out.push(JSON.parse(response.entities[i].replaceAll("'", "\"")))
                    continue
                }
                out.push(response.entities[i])
            }
            console.log(out)
            setAnalyzedText(out)
            // for (let i = 0; i < response.length; i++) {
            //     let rs = response[i]
            //     console.log(response[i])
            //     // analyzedText.replace(rs, <EntityHighlight data={}/>)
            // }

            //setAnalyzedForm(response)
        }).then(() => setLoading(false))
        
    };

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnalyzedForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const colorDict = {'ORG':'#C9D4FB', 'LAW':'#F2C4C3', 'LANGUAGE':'#FEE79C', 'FAC':'#a6edb2', 'PERSON': '#c8b5ff', 'WORK_OF_ART':'#ffd2a8', 'GPE': '#e6a8ff', 'PRODUCT': '#a8b4ff', 'EVENT': '#a8fff8', 'LOC': '#c8ffa8'}

  return (
    <Flex justifyContent='center'>
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection='column'>
      <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
            
            <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
                <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
                    <Text color="white" fontWeight={800} align="center"><SiMoleculer /></Text>
                    <Text ml={1.5} mt={-0.5} fontWeight={800} color="white">Text Analyzer</Text>
                    <Box onClick={() => router.push('/')} _hover={{cursor: 'pointer'}} mt={-1} borderRadius="10px" ml="auto" border="2px solid #38393E" height="25px" width="180px">
                                <Text  ml={2.5} mt={-0.5} fontWeight={800} color="white" mr={0}>← Back to Dashboard</Text>
                    </Box>
                </Flex>
                <Flex ml={2} mr={1} mt={6} mb={6} flexDir="column" pr={3} flexDirection="row" width="100%">
                    <Text ml={10} mr={10} fontWeight={800} color="white" fontSize="13pt">The text analyzer uses machine learning to identify important topics within a text, then classify and define them using the Wikipedia API. The machine learning algorithms used by the text analyzer are trained are a large collection of texts, making this tool an accurate and reliable method for understanding texts. The text analyzer can be used to analyze a wide variety of texts, from a single sentence to an entire academic paper.</Text>
                </Flex>
                <form onSubmit={onSubmit}>
                    <Flex mb={7} flexDirection="row" ml={10} mr={10}>
                        <Flex flexDirection="column" border="2px solid #38393E" pt={2} pl={5} pr={5} borderRadius="10px" mr={5} height="400px" width="50%" bg="#202125">
                            <Text fontSize="13pt" color="white" fontWeight={700}>Text</Text>
                            <Textarea onChange={onChange} mb={5} name="text"  _placeholder={{ color: "#55586b" }} color="white" bg="#202125" required height="340px" _focus={{ border: "1.5px solid #616aee" }} isDisabled={false} placeholder='Enter text you want to analyze' />
                        </Flex>
                        <Flex display="inline" overflow="scroll"  flexDirection="column" pt={5} pl={5} pr={5} border="2px solid #38393E" borderRadius="10px" ml={5} height="400px" width="50%" bg="#202125">
                            <Text mb={3} mt={-2} fontWeight={800} fontSize="14pt" color="white">Analyzed Text</Text>
                            
                            {analyzedText.map((entity, index) => {
                                if (typeof entity === "string") {
                                    return <Text key={index} display="inline" color="white">{entity}</Text>
                                } else {
                                    return <Tooltip key={index}label={entity[2]}><Text pl={0.5} pr={1} borderRadius="10px" bg={colorDict[entity[1] as keyof typeof colorDict]} display="inline" color="black">{entity[0]}</Text></Tooltip>
                                }
                            })}
                        </Flex>
                    </Flex>
                    <Flex flexDirection="row" align="center">
                        <Button isLoading={loading} type="submit" _hover={{ bg: "#5f40f7" }} height="45px" bg="#616aee" color="white" ml="43px" width="155px">Analyze Text</Button>
                        
                        <Flex overflow="scroll" flexDirection="column" mt={-5} width="30%" ml="auto" mr="17%">
                            <Text color="white" fontSize="13pt" fontWeight={700}>Hover to view Color Scheme</Text>
                            <Flex borderRadius="8px" bg="#202125" flexDirection="row" height="50px" width="100%">
                                <Flex align="center" ml={2} flexDirection="row">
                                    <Tooltip placement="top" label="ORG">
                                        <Flex borderRadius="5px" height="20px" width="20px" bg="#C9D4FB"></Flex>
                                    </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                    <Tooltip placement="top" label="LAW">
                                        <Flex borderRadius="5px" height="20px" width="20px" bg="#F2C4C3"></Flex>
                                    </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                    <Tooltip placement="top" label="LANGUAGE">
                                        <Flex borderRadius="5px" height="20px" width="20px" bg="#FEE79C"></Flex>
                                    </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="FAC">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#a6edb2"></Flex>
                                </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="PERSON">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#c8b5ff"></Flex>
                                </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="WORK_OF_ART">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#ffd2a8"></Flex>
                                </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="Government Person/Entity">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#e6a8ff"></Flex>
                                </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="PRODUCT">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#a8b4ff"></Flex>
                                </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="EVENT">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#a8fff8"></Flex>
                                </Tooltip>
                                </Flex>
                                <Flex align="center" ml={3} flexDirection="row">
                                <Tooltip placement="top" label="LOC">
                                    <Flex borderRadius="5px" height="20px" width="20px" bg="#c8ffa8"></Flex>
                                </Tooltip>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </form>
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TextAnalyzer;
