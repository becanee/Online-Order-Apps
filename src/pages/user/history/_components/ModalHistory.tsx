import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Avatar,
  Textarea,
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";

const labelStyles = {
  mt: "2",
  mr: "2",
  ml: "-2.5",
  fontSize: "sm",
  display: "flex",
};

const ModalHistory = ({ isOpen, onClose, data, loading, addRating }: any) => {
  const [sliderValue, setSliderValue] = useState(
    data?.rating
      ? data?.rating === 1
        ? 20
        : data?.rating === 2
        ? 40
        : data?.rating === 3
        ? 60
        : data?.rating === 4
        ? 80
        : data?.rating === 5
        ? 100
        : 20
      : 0
  );
  const [feedback, setFeedback] = useState(
    data?.feedback ? data?.feedbacak : ""
  );

  const handleSubmit = async () => {
    if (sliderValue === 20) {
      addRating({
        order_id: data?.id,
        rating: 1,
        feedback: feedback,
      });
    } else if (sliderValue === 40) {
      addRating({
        order_id: data?.id,
        rating: 2,
        feedback: feedback,
      });
    } else if (sliderValue === 60) {
      addRating({
        order_id: data?.id,
        rating: 3,
        feedback: feedback,
      });
    } else if (sliderValue === 80) {
      addRating({
        order_id: data?.id,
        rating: 4,
        feedback: feedback,
      });
    } else if (sliderValue === 100) {
      addRating({
        order_id: data?.id,
        rating: 5,
        feedback: feedback,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Avatar
              size="sm"
              name={data?.product?.name}
              src={data?.product?.picture ? data?.product?.picture : ""}
              className="mr-2"
            />
            {data?.product?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Rating{" "}
                {data?.rating ? (
                  <div className="flex">
                    <IoStarSharp size={20} className="text-yellow-500" />{" "}
                    {` ${data?.rating}`}
                  </div>
                ) : null}
              </FormLabel>
              {!data?.rating ? (
                <Box p={4} pt={6}>
                  <Slider
                    aria-label="slider-ex-6"
                    onChange={(val: any) => setSliderValue(val)}
                    step={20}
                    defaultValue={20}
                    min={20}
                    isDisabled={data?.rating || loading}
                  >
                    <SliderMark value={20} {...labelStyles}>
                      <IoStarSharp size={20} className="text-yellow-500" />1
                    </SliderMark>
                    <SliderMark value={40} {...labelStyles}>
                      <IoStarSharp size={20} className="text-yellow-500" />2
                    </SliderMark>
                    <SliderMark value={60} {...labelStyles}>
                      <IoStarSharp size={20} className="text-yellow-500" />3
                    </SliderMark>
                    <SliderMark value={80} {...labelStyles}>
                      <IoStarSharp size={20} className="text-yellow-500" />4
                    </SliderMark>
                    <SliderMark value={100} {...labelStyles}>
                      <IoStarSharp size={20} className="text-yellow-500" />5
                    </SliderMark>
                    <SliderMark
                      value={sliderValue}
                      textAlign="center"
                      color="white"
                      mt="-12"
                      ml="-5"
                      w="22"
                      fontSize={33}
                    >
                      {sliderValue < 21
                        ? "🤢"
                        : sliderValue < 41
                        ? "😐"
                        : sliderValue < 61
                        ? "😃"
                        : sliderValue < 81
                        ? "💯"
                        : sliderValue > 91
                        ? "🔥"
                        : null}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              ) : null}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Feedback</FormLabel>
              {data?.feedback ? (
                <>
                  <p>{data?.feedback}</p>
                </>
              ) : null}
              {!data?.feedback ? (
                <Textarea
                  disabled={data?.feedback || loading}
                  defaultValue={data?.feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  height="40"
                />
              ) : null}
            </FormControl>
            {!data?.rating && !data?.feedback ? (
              <ModalFooter>
                <Button
                  variant="solid"
                  colorScheme="whatsapp"
                  size="sm"
                  className="mt-4 -mb-4 -mr-5"
                  onClick={() => {
                    handleSubmit();
                    onClose();
                  }}
                  isLoading={loading}
                >
                  Kirim Feedback
                </Button>
              </ModalFooter>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalHistory;
