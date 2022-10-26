import { Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react';
import { SiIpfs } from 'react-icons/si'
import { constSelector } from 'recoil';

const AnalogyGenerator: NextPage = () => {
    const [analogyForm, setAnalogyForm] = useState({
        target: "",
        article: "",
      });
    
    const [loading, setLoading] = useState(false)
    

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();

        console.log(analogyForm.target);
        console.log(analogyForm.article)

        fetch(`http://localhost:8080/analogy/?text=${analogyForm.article}?target=${analogyForm.target}`).then((response) => {console.log(response.json())})
        setLoading(false)
    };

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnalogyForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

  return (
    <Flex justifyContent='center'>
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection='column'>
      <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
            
            <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
                <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
                    <Text color="white" fontWeight={800} align="center"><SiIpfs /></Text>
                    <Text ml={1.5} mt={-1} fontWeight={800} color="white">Analogy Generator</Text>
                </Flex>
                <Flex ml={2} mr={1} mt={6} mb={6} flexDir="column" pr={3} flexDirection="row" width="100%">
                    <Text ml={10} mr={10} fontWeight={800} color="white">Given a topic and a piece of text, the analogy generator attempts to explain the relationship between these topics. Using machine learning, it looks for patterns in a large corpus of text and uses those patterns to generate an analogy. We hope that by providing information in a more easily interpreted manner, the analogy generator can help people better understand the topics being discussed.</Text>
                </Flex>
                <form onSubmit={onSubmit}>
                    <Flex mb={7} flexDirection="row" ml={10} mr={10}>
                        <Flex flexDirection="column" border="2px solid #38393E" pt={2} pl={5} pr={5} borderRadius="10px" mr={5} height="400px" width="50%" bg="#202125">
                            <Text color="white" fontWeight={700}>Target:</Text>
                            <Textarea onChange={onChange} height="200px" name="target"  _placeholder={{ color: "#3f414d" }} color="white" bg="#202125" required _focus={{ border: "1.5px solid #616aee" }} isDisabled={false} placeholder='What you want the analogy to describe' />
                            
                            <Text color="white" fontWeight={700}>Article:</Text>
                            <Textarea onChange={onChange} mb={5} name="article"  _placeholder={{ color: "#3f414d" }} color="white" bg="#202125" required height="200px" _focus={{ border: "1.5px solid #616aee" }} isDisabled={false} placeholder='What you want the analogy to derive from' />
                        </Flex>
                        <Flex pt={5} pl={5} pr={5} border="2px solid #38393E" borderRadius="10px" ml={5} height="400px" width="50%" bg="#202125">
                            <Text fontWeight={800} fontSize="16pt" color="white">Analogy Generated:</Text>
                        </Flex>
                    </Flex>
                    <Button isLoading={loading} type="submit" _hover={{ bg: "#5f40f7" }} height="45px" bg="#616aee" color="white" ml="43px" width="155px">Generate Analogy</Button>
                </form>
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AnalogyGenerator;
