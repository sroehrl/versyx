<?php

namespace App\Api;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Api caller class
 */
class Caller
{
    /** @var Client Client  */
    private $client;

    /**
     * Caller constructor
     */
    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => env("API_URL")
        ]);
    }

    /**
     * Call api endpoint.
     *
     * @param string $method
     * @param string $endpoint
     *
     * @return array|bool
     */
    public function call(string $endpoint, string $method = 'GET')
    {
        if (env("DEBUG") === true) {
            $file = __DIR__ . '/../../tests/' . $endpoint . '.json';
            if(file_exists($file)) {
                return toArray(json_decode(file_get_contents($file)));
            } else {
                return false;
            }
        }

        if (substr($endpoint, 0, 1) !== '/') {
            $endpoint = '/' . $endpoint;
        }

        try {
            $response = $this->client->request($method, $endpoint);
            if ($response && $response->getStatusCode() === 200) {
                return toArray(json_decode($response->getBody()->getContents()));
            } else {
                return false;
            }
        } catch (GuzzleException $e) {
            echo $e->getMessage();
            return false;
        }
    }
}