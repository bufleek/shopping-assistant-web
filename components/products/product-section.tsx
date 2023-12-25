import { useState, useEffect } from "react";
import { Platform } from "@/data/models/app_configs";
import { Product } from "@/data/models/products";
import { getProducts } from "@/data/models/products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Icon,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function ProductSection({
  platform,
  query,
  base_url,
}: {
  platform: Platform;
  query: string | null;
  base_url: string | null;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleGetProducts() {
    if (query && base_url) {
      setIsLoading(true);
      setError(null);
      getProducts({ platform, query, base_url })
        .then((productList) => {
          setProducts(productList.products);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" py={4}>
            <Typography variant="h5" component="h2" px={0}>
              {platform.name}
            </Typography>
            <Typography component="h2">See all</Typography>
          </Stack>

          {error ? (
            <Stack direction="column" alignItems="center" spacing={2}>
              <Typography component="h2">
                Failed to load <span><Link href={platform.url} target="_blank" underline="always">{platform.name}</Link></span> products. 
                </Typography>
              <Typography component="caption">Error: {error}</Typography>
              <Button
                onClick={handleGetProducts}
              >
                Retry
              </Button>
            </Stack>
          ) : (
            <Grid container spacing={1}>
              {(isLoading ? Array.from(new Array(20)) : products).map(
                (product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                    key={isLoading ? product : product.link}
                  >
                    <Link
                      href={!isLoading && product ? product.link : ""}
                      underline="none"
                      target="_blank"
                    >
                      <Card
                        sx={{
                          height: "100%",
                        }}
                      >
                        {isLoading ? (
                          <Skeleton height={200} width="100%" />
                        ) : (
                          <Box mt={2}>
                            <img src={product.image} alt={product.name} />
                          </Box>
                        )}
                        <Box px={2} pb={2}>
                          {isLoading ? (
                            <Skeleton count={1} />
                          ) : (
                            <Typography variant="body2" component="p" py={1}>
                              {product.name}
                            </Typography>
                          )}
                          <Stack direction="row" justifyContent="space-between">
                            <Stack>
                              {isLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                product.old_price && (
                                  <Typography
                                    variant="caption"
                                    component="span"
                                    sx={{
                                      textDecoration: "line-through",
                                      color: "text.disabled",
                                    }}
                                  >
                                    {product.price.currency}
                                    {product.old_price.amount ??
                                      product.old_price?.amount_range}
                                  </Typography>
                                )
                              )}
                              {isLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                <Typography
                                  variant="subtitle1"
                                  component="h2"
                                  fontWeight={600}
                                >
                                  {product.price.currency}
                                  {product.price.amount ??
                                    product.price?.amount_range}
                                </Typography>
                              )}
                            </Stack>
                            {isLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              product.rating &&
                              product.reviews && (
                                <Stack direction="row">
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      component="span"
                                    >
                                      {product.rating}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <StarBorderIcon fontSize="small" />
                                  </Box>
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      component="span"
                                    >
                                      {product.reviews}
                                    </Typography>
                                  </Box>
                                </Stack>
                              )
                            )}
                          </Stack>
                        </Box>
                      </Card>
                    </Link>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </Stack>
      </Container>
    </>
  );
}
